ep1={112:45, 23:56, 78:90,132:45}
print(ep1)
print(ep1.get(112))
print(ep1.get(111,"Not Found"))
print(ep1.keys())  
print(ep1.values())
print(ep1.items())
ep1.update({"mynul":22})
print(ep1)
ep2={110:34, 23:57, 78:90,132:45}
print(ep2)
ep1.update(ep2)
print(ep1)
ep1.pop(110)
print(ep1)
ep1.popitem()
print(ep1)
ep1.clear()

print(ep1)
del ep1
# print(ep1) # it will give error as the dictionary is deleted
# print(ep2)
ep2.clear()
