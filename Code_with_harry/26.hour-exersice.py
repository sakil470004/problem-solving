import time
t = time.strftime("%H:%M:%S")
print(t)
hour = int(time.strftime("%H"))
if( hour>=6 and hour<12):
    print("Good Morning")
elif(hour>=12 and hour<18):
    print("Good Afternoon")
else:
    print("Good Evening")