32. In a real e-commerce app (like Easy Bazaar), how would you manage global state?

Answer:

Depends on complexity:

Small app → Context + useReducer

Medium → Zustand

Large enterprise → Redux Toolkit

For example:

Auth state → global

Cart → global

UI state (modal open?) → local

Rule:
Global state should be rare. Overusing it creates coupling.