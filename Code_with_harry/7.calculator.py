first_number = input("Enter 1st Number: ")
second_number = input("Enter 2nd Number: ")
operation = input("Enter the operation: ")
print("The result is: ", end="")
if operation == "+":
    print(int(first_number) + int(second_number))
elif operation == "-":
    print(int(first_number) - int(second_number))
elif operation == "*":
    print(int(first_number) * int(second_number))
elif operation == "/":
    print(int(first_number) / int(second_number))
else:
    print("Invalid operation")
