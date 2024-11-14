marks=[54,89,100,23,45,67,89,90]
print(marks)
print(marks)
# for sort
# marks.sort()
print(len(marks)) # length of list
print(marks[-3])# negative indexing
print(marks[len(marks)-3]) #positive indexings

if 89 in marks:
    print("Yes, it is in the list")
else:
    print("No, it is not in the list")

if "kiil" in "sakil":
    print("Yes, it is in the string")
else:
    print("No, it is not in the string")
    
print('marks[0:3]:',marks[0:3])
print('marks[1:]:',marks[1:])
print('marks[:3]:',marks[:3])
print('marks[:]:',marks[:])
print('marks[::2]:',marks[::2])
print('marks[1::2]:',marks[1::2])
print('marks[2:-1]:',marks[2:-1])

list=[i for i in range(5)]
list2=[i*i for i in range(5)]
print(list,list2)
list2=[i*i for i in range(5) if i%2==0]
print(list,list2)
