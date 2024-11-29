try :
    num=int(input("Enter a number: "))
    a=[1,2,3]
    print(a[num])
except ValueError :
    print("Please enter a valid number")
except IndexError as e :
    print("Index out of range")
    print(e)