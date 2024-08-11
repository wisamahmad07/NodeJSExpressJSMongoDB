/* result is undefined because its not ready at that time
   So, we have to use 
   Callbacks
   Promises
   Async and await */
console.log("before");
const result = getUser();
console.log(result);

console.log("after");

function getUser(id) {
  setTimeout(() => {
    console.log("connecting to db...");
    return { id: id, name: "Mosh" };
  }, 2000);
}
