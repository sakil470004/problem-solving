disc={
    "name":"Mynul Islam",
    "age":22,
    "fav_movies":["coco","kimi no na wa"],
}
print(disc)
print(disc["name"])
print(disc["fav_movies"])
disc["hobbies"]=["reading","coding"]
print(disc)
print(disc.get("name2"))# it will return None if the key is not present in the dictionary
print(disc.get("name2","Not Found")) # it will return the value of the key if the key is present in the dictionary
# print(disc["name2"]) # it will give error if the key is not present in the dictionary
print(disc.keys())
print(disc.values())

for key in disc.keys():
    print(disc[key])
for value in disc.values():
    print(value)

for key,value in disc.items():
    print(f"{key} is {value}")
