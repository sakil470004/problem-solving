def avg (a=9,b=1):
    print("The average of two numbers is: ",(a+b)/2)


avg(5,7)
avg()
avg(5)
avg(b=5)
avg(b=5,a=20)


def findListAvarage(*numbers):
    sum=0
    for number in numbers:
        sum+=number
    print("The average of numbers is: ",sum/len(numbers))
    return sum/len(numbers)

listTotal=findListAvarage(1,2,3,4,5,6,7,8,9,10)
print("The total of list is: ",listTotal)

def printAllDistionary(**distionary):
    for key,value in distionary.items():
        print(key,value)

printAllDistionary(first="Mynul",middle="Islam",last="Sakil")
printAllDistionary(first="Mynul2",middle="Islam2")