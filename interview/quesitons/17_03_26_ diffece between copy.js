Q3. Explain the difference between shallow copy and deep copy.

Shallow copy
Copies references.

const a = {x:1}
const b = {...a}

Nested objects still share reference.

Deep copy
Copies everything recursively.

Example:

const b = JSON.parse(JSON.stringify(a))