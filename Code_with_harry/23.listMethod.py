list = [304,23,45,67,89,90]
print(list)
list.append(100)
print(list)
list.insert(2,200)
print(list)
list.remove(23)
print(list)
list.pop()
print(list)
list.pop(2)
print(list)
list[1]=100
print(list)
list.insert(2,100)
list.append(54)
print(list)
list.sort()
print(list)
list.reverse()
print(list)
list.sort(reverse=True)
print(list)
hunderd=list.index(100)
print(hunderd)
print(list.count(100))
# shallow copy
# newList=list
newList=list.copy()
newList.append("x")
print(list,newList)
# extend
m=[1,2,3,4,5]
newList.extend(m)
print(newList)
# concaticate
k=m+list
n=list+m
print(k,n)