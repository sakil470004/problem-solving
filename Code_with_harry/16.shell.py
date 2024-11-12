import os

print("Hello World")
os.system("python3 --version")


x=int(input("Enter the value of x: "))

match x:
    case 0:
        print("You entered 0")
    case 1:
        print("You entered 1")
    case 4:
        print("You entered 4")
    case _ if x<10:
        print("You entered a number less than 10")
    case _:
        print("You entered a number greater than 10")