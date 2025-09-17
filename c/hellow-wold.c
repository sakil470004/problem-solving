#include <stdio.h> // for printf and scanf

int main()
{
    char name[50]; // variable to store input (string)

    printf("Enter your name: "); // ask the user
    scanf("%49s", name);         // read input (up to 49 characters, avoid overflow)

    printf("Hello, %s! Welcome to C programming.\n", name); // print with formatting
    return 0;
}