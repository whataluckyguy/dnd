export const reorderList = function (a, x, y) {
    if (a.length === 1) return a;

    let arr = [...a], temp;
    temp = arr[x];
    arr.splice(x,1)
    arr.splice(y, 0, temp)
    return arr;
};

export function checkDOMelements (classNames, node, exact = false) {
    for(let clsIndex = 0; clsIndex < classNames.length; clsIndex++) {
        const className = classNames[clsIndex];

        for(let i = node.length - 1; i >= 0; i--) {
            if(exact) {
                if(node[i]?.classList.includes(className)) return className;
            }
            else {
                console.log()
                if(node[i]?.className.includes(className)) return className;
            }
        }  
    }
     
    return null;

}

export function getDropIndex (className, node) {
    for(let i = node.length - 1; i >= 0; i--) {
        for(let j = 0; j < node[i].classList.length; j++) {
            const listItem = node[i].classList[j]
            if(listItem.includes(className))
            return Number(listItem.replace(className, ""))
        }
    }  
    return null;
}