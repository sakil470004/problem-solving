# factorial using recurssion
def factorial(n):
    if n==0:
        return 1
    return n*factorial(n-1)
n = int(input("Enter the number: "))
print("The factorial of",n,"is",factorial(n))

# fibonacci series using recurssion
def fibonacci(n):
    if n==1:
        return 0
    elif n==2:
        return 1
    else:
        return fibonacci(n-1)+fibonacci(n-2)

n = int(input("Enter the number: "))
print("The",n,"th fibonacci number is",fibonacci(n))