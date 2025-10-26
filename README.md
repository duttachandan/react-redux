Explanation of the Whole Template

## 🧠 What is a Promise?

A Promise is an object in JavaScript that represents the eventual completion (or failure) of an asynchronous operation.

In simple words:

`A Promise is like a “future value placeholder” — it’s something that will give you a result later, not right now.`

Think of it as ordering food at a restaurant 🍽️:

- You place your order → that’s the async operation.

- The waiter gives you a token → that’s the Promise.

- When the food is ready → the Promise resolves (success).

- If the chef burns it → the Promise rejects (error).

```js
const myPromise = new Promise((resolve, reject) => {
  // Do something (like fetching data, reading a file, etc.)

  const success = true;

  if (success) {
    resolve("Operation successful!"); // fulfilled
  } else {
    reject("Something went wrong!"); // rejected
  }
});
```

You use .then() and .catch() to handle results:

```js
myPromise
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.log("Error:", error);
  })
  .finally(() => {
    console.log("This runs no matter what.");
  });
```

## ⏳ Real-world async example

Example: simulating an API call with a delay.

```js
const fetchUser = new Promise((resolve, reject) => {
  setTimeout(() => {
    const user = { name: "Chandan", age: 22 };
    resolve(user);
  }, 2000);
});

fetchUser.then((data) => console.log(data));
```

Output after 2 seconds

```js
{ name: "Chandan", age: 22 }
```

## ⚡ async / await (cleaner syntax for Promises)

Instead of chaining .then() calls, JavaScript introduced async and await.

Same example with async/await:

```js
async function getUser() {
  const user = await fetchUser; // waits until promise resolves
  console.log(user);
}

getUser();
```

It’s easier to read — almost like synchronous code — but still non-blocking behind the scenes.

## 🔁 Promise States

A Promise can be in three states:

| State                    | Meaning                               |
| ------------------------ | ------------------------------------- |
| **Pending**              | The operation is still running.       |
| **Fulfilled (Resolved)** | The operation completed successfully. |
| **Rejected**             | The operation failed.                 |

Once a promise is resolved or rejected, its state can’t change again.

<br/>

## PreLoadingImage.jsx

let’s unpack exactly what’s happening inside Promise.all([...]) and the preloadImages helper, step-by-step, with clear examples, failure modes, and nicer alternatives you can plug into your app.

## What `Promise.all([...])` does — step-by-step

Imagine you have several asynchronous tasks (API calls, image preloads, etc.). Promise.all lets you wait until all of them have finished.

```js
const apiPromise = fetch("/api/data").then((res) => res.json());
const imagePromise = preloadImages(["/a.jpg", "/b.jpg"]);
await Promise.all([apiPromise, imagePromise]);
```

Step breakdown:

1.  `Promise.all` accepts an iterable (usually an array) of promises.

2.  It returns a new promise `P_all`.

3.  `P_all` will resolve when every promise in the array resolves.

    - The resolved value is an array with each promise’s resolution, in the same order as the input.
    - Example: if `apiPromise` resolves to `{data:...}` and `imagePromise` resolves to `undefined`, then `await Promise.all([apiPromise, imagePromise])` gives `[{data: ...}, undefined]`.

If any input promise rejects, P_all rejects immediately with that rejection reason — it does not wait for the other promises to finish.

This is why a single failure can abort the whole Promise.all.

Promise.all([]) (an empty array) resolves immediately with []. Useful if you have no tasks.

`Common Pattern:`

```js
try {
  const [apiData] = await Promise.all([apiPromise, imagePromise]);
  // success — both finished
} catch (err) {
  // at least one failed — handle it
}
```

## Why `Promise.all` is used in the loader example

You want the loader visible until:

- API is done, and
- images are preloaded.

So you start both things (they run concurrently), and `await Promise.all([apiPromise, imagePromise])` ensures you wait for both to finish before hiding the loader.

## Failure modes and safer alternatives

- Problem: If one image fails (404), `preloadImages` might reject and `Promise.all` rejects -> loader hides? No — it goes to catch. You must handle it.

- Safer alternatives:
  - `Promise.allSettled([...]):` waits for all to settle (either fulfilled or rejected) and returns status for each. Use when you don’t want one failure to cancel everything.
  - Wrap each promise so it never rejects (resolve on error) — which we used in the earlier helper `(onerror: resolve)` to make preload resolve even on fail.
  - Implement a timeout using `Promise.race([task, timeoutPromise])` if you don’t want to wait forever.

## Example using allSettled:

```js
const results = await Promise.allSettled([apiPromise, imagePromise]);
/* results = [{status: 'fulfilled', value: ...}, {status:'rejected', reason:...}] */
```

## The `preloadImages` helper — line-by-line

```js
export function preloadImages(imageUrls = []) {
  const promises = imageUrls.map(
    (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
      })
  );
  return Promise.all(promises);
}
```

Step-by-step:

- `imageUrls.map(...)` — for each image URL we create a new Promise.
- `new Image()` — creates an HTMLImageElement (not yet attached to DOM).

- `img.src = src` — assigning src begins the browser download. If the image is cached, it may load immediately.

- `img.onload = resolve` — when the image finishes loading successfully, we call resolve() to fulfill that promise.

- `img.onerror = resolve ` — on error we also call resolve() (not reject) — this is intentional: we don’t want one broken image to reject the whole preload. You can change it to reject if you prefer strict behavior.

- `Promise.all(promises)` — returns a promise that resolves when all these img promises resolve (i.e., when all images have loaded or errored, depending on your handler).

## Example integration with Redux loader & robust error handling

A pattern that ensures loader hides even on error:

```js
useEffect(() => {
  let mounted = true;
  dispatch(startLoading());

  const apiPromise = fetch("/api/home").then((r) => r.json());

  const imagesPromise = preloadImages(["/a.jpg", "/b.jpg"]);

  Promise.all([apiPromise, imagesPromise])
    .then(([apiData, images]) => {
      if (!mounted) return;
      // do something with apiData
    })
    .catch((err) => {
      // If any promise rejected (e.g., you used reject in preload), handle here
      console.error("Loading error", err);
    })
    .finally(() => {
      if (!mounted) return;
      dispatch(stopLoading());
    });

  return () => {
    mounted = false;
  };
}, [dispatch]);
```
