# interview-frontend
Challenge for frontend interview

*Welcome to Cylera's frontend interview.*

## React challenge

Your challenge is to create a dashboard to list and view medical devices monitored and protected by Cylera's cybersecurity software. The base of the project will be structured using Facebook's Create React App software. Please feel free to use the internet, install any relevant packages, and ask any questions pertaining to the problem.

Data for the devices to be displayed is located in `devices.py` - add an endpoint to the API you built in [interview-platform-takehome](https://github.com/Cylera/interview-platform-take-home) to expose them to your frontend.

You'll have 60 minutes to complete this challenge.

### Dashboard

![dashboard](images/react_challenge_dashboard.png)

## JavaScript challenge

You'll have 45 minutes to complete the following problems:

#### Problem 1

Write a function to determine if a string is a palindrome (same characters forward and backward, case-insensitive, ignore punctuation).

#### Problem 2

Write a function to count the number of occurrences of all words in a sentence.

#### Problem 3

Write a function to replace the first X occurrences of a word in a sentence.

#### Problem 4

What is the output of the following code?

```
var count = 0;
var numStr = "0";
var objStr = new String("0");

console.log(count == count);
console.log(count == numStr);
console.log(count == objStr);
console.log(numStr == objStr);
console.log(count === objStr);
console.log(count === numStr);
console.log(numStr === objStr);
```

#### Problem 5

What will be the output of the following function and why?

```
var count = 10;
function f(){
   	var count = 11;
    function g(){
        count++;
        var count = 12;
        console.log(count);
    }
    g();
}
f();
```
