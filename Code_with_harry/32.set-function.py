cities ={ "Kolkata", "Delhi", "Mumbai", "Chennai", "Pune", "Bangalore"}
cities2={"Tokyo", "New York", "Delhi", "Mumbai", "Pune", "Bangalore"}
print(cities,cities2)
cities3=cities.union(cities2)
cities4=cities.intersection(cities2)
print(cities3,cities4)
cities5=cities.difference(cities2)
cities6=cities2.difference(cities)
cities7=cities.symmetric_difference(cities2)
# cities8=cities.intersection_update(cities2)// its return None but update the cities
print(cities5,cities6,cities7)
print(cities.isdisjoint(cities2))
print(cities.issubset(cities2))
print(cities.issuperset(cities2))
cities.add("Dhaka")
# cities.remove("Kolkata") # it will give error if the element is not present in the set
cities.discard("Kolkata") # it will not give error if the element is not present in the set
# del cities # it will delete the set
print(cities)
cities.add("Dhaka") # it will not add the element if it is already present in the set
cities.add("dhaka") # it will add the element if it is not already present in the set because it is case sensitive
print(cities)