
function minimumBribes(q) {
    // Write your code here
    let bribes = 0;
    for(let i=0;i<q.length-1;i++){
    for(let j=i+1;j<q.length;j++){
        if(q[i]>q[j]){
            swap(q[i],q[j]);
            bribes++;
        }
    }
    console.log(q);
    return bribes;

}
const result=minimumBribes([1, 2, 5, 3 ,4 ,7, 8, 6]);