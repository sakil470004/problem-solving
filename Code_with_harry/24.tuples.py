tuple=(2,35,3,4,5,6,7,8,9,0)
print(tuple)
print(tuple[0])
print(tuple[1])
print(type(tuple))
# python will consider this as a tuple not a integer. if you want to make it a integer then you have to put a comma after the number
tup2=(1,)
print(type(tup2))
# tuple can have multiple data type
tup3=(1,"sakil",2.5)
print(tup3)
# tuple is immutable
# tup3[0]=2
# print(tup3)
# we can delete the whole tuple
del tup3
# print(tup3)
# we can not delete a single element from a tuple
# we can not add element to a tuple
if 5 in tuple:
    print("Yes, it is in tuple")
else:
    print("No, it is not a tuple")

tuple2=tuple[0:5]
print(tuple2)