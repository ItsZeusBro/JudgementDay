import path from "node:path"
import {createHash} from 'node:crypto'

export class Utils{
    
    resolve(pathFromProjectHome){
        return path.resolve('./').split('Sasquatch/Sasquatch')[0]+'Sasquatch/Sasquatch/'+pathFromProjectHome
    }
    hash(anything){
		return createHash('sha256').update(anything).digest('hex');
	}

    nNeighborhoods(uniqueChars, dimension){
        var r = uniqueChars
        var nNeighborhoods=0
        for(var n = dimension; n<=2*dimension; n++){
            nNeighborhoods+=(this.factorial((n+r-1)))/(this.factorial(n)*this.factorial(r-1))
        }
        return nNeighborhoods
    }
    factorial (n) {
        //https://stackoverflow.com/questions/3959211/what-is-the-fastest-factorial-function-in-javascript
        if (n === 0)
        { return 1; }
        else
        { return n * this.factorial( n - 1 ); }
    }
    _combinationWithRepetition(r, n){
        return (this.factorial((n+r-1)))/(this.factorial(n)*this.factorial(r-1))
    }
    //i is the significant index in the symbols list
    combinationWithRepetition(symbols, n, out=[]){
        if(out.length==0){
            var next=[]
            for(var k = 0; k<n; k++){
                next.push(symbols[symbols.length-1])
            }
            console.log(next)
            out.unshift(next)
            this.combinationWithRepetition(symbols, n, out)
        }
        if(out[0][0]==symbols[0]){return out}
        
        var next=out[0].slice()
        //if you cant decrement jth index any further decrement j
        //if you can, do so and reset
        for(var j =n-1; j>=0; j--){
            if(next[j]!=symbols[0]){
                next[j]=symbols[symbols.indexOf(next[j])-1]

                next = this._reset(symbols, symbols[symbols.indexOf(next[j])], next, j)
                console.log(next)
                out.unshift(next)
                this.combinationWithRepetition(symbols, n, out)
                return
            }
        }


        // //if we are at a significant index and it is not already at symbols[0], we just decrement it and
        // //out.unshift(next)

        // //use this to reset if necessary
    }

    _reset(symbols, val, arr, i){
        //reseting from the significant index for arr to val
        for(var j = i; j<arr.length; j++){
            arr[j]=val
        }
        return arr
    }

}

var out = new Utils().combinationWithRepetition([1,2, 3, 4, 5, 6, 7, 8, 9, 10], 4, [])
console.log(out.length)
console.log(new Utils()._combinationWithRepetition(10, 4))