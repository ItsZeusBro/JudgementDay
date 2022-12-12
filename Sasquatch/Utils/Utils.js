import path from "node:path"
import {createHash} from 'node:crypto'
import {Combinatorics} from "./Combinatorics/Combinatorics.js"
import {Coordinates} from "./Matrix/Coordinates/Coordinates.js"

export class Utils{
    resolve(pathFromProjectHome){
        return path.resolve('./').split('Sasquatch/Sasquatch')[0]+'Sasquatch/Sasquatch/'+pathFromProjectHome
    }
    hash(anything){
		return createHash('sha256').update(anything).digest('hex');
	}

    nOrderedNeighborhoods(uniqueChars, dimension){
        var n = uniqueChars
        var nNeighborhoods=0
        for(var r = dimension; r<=2*dimension; r++){
            nNeighborhoods+= new Combinatorics()._CwithR(n, r)
        }
        return nNeighborhoods
    }

    hex2bin(hex){
		//https://stackoverflow.com/questions/45053624/convert-hex-to-binary-in-javascript
		hex = hex.replace("0x", "").toLowerCase();
		var out = "";
		for(var c of hex) {
			switch(c) {
				case '0': out += "0000"; break;
				case '1': out += "0001"; break;
				case '2': out += "0010"; break;
				case '3': out += "0011"; break;
				case '4': out += "0100"; break;
				case '5': out += "0101"; break;
				case '6': out += "0110"; break;
				case '7': out += "0111"; break;
				case '8': out += "1000"; break;
				case '9': out += "1001"; break;
				case 'a': out += "1010"; break;
				case 'b': out += "1011"; break;
				case 'c': out += "1100"; break;
				case 'd': out += "1101"; break;
				case 'e': out += "1110"; break;
				case 'f': out += "1111"; break;
				default: return "";
			}
		}
		return out;
	}
	bin2hex(bin){
		var out = "";
		var accumulator=''
		for(var c = 1; c<=bin.length; c++) {
			accumulator+=bin[c-1]
			if(c%4==0){
				switch(accumulator) {
					case "0000": out += '0'; break;
					case "0001": out += '1'; break;
					case "0010": out += '2'; break;
					case "0011": out += '3'; break;
					case "0100": out += '4'; break;
					case "0101": out += '5'; break;
					case "0110": out += '6'; break;
					case "0111": out += '7'; break;
					case "1000": out += '8'; break;
					case "1001": out += '9'; break;
					case "1010": out += 'A'; break;
					case "1011": out += 'B'; break;
					case "1100": out += 'C'; break;
					case "1101": out += 'D'; break;
					case "1110": out += 'E'; break;
					case "1111": out += 'F'; break;
					default: return "";
				}
				accumulator=""
			}
		}
		return out;
	}
	bin2Decimal(bin){
		//start from the right
		var i = bin.length-1;
		var decimal=0
		var j = 0;
		while(i>=0){
			if(bin[i]=='1'){
				decimal+=Math.pow(2, j)
			}
			i--
			j++
		}
		return decimal
	}

	decimal2Bin(decimal){
		var bin=[]
		var i = 0
		if(decimal==0){
			return 0
		}
		while(true){
			if(decimal>=Math.pow(2, i)){
				bin.push(0)
				i++
			}else{
				bin[0]=1
				break
			}
		}
		var count=Math.pow(2, bin.length-1)
		i=bin.length-1
		for(var j=1; j<bin.length; j++){
			if(count+Math.pow(2, i-1)<decimal){
				bin[j]=1
				count+=Math.pow(2, i-1)
			}else if(count+Math.pow(2, i-1)==decimal){
				bin[j]=1
				return bin
			}else{
				//count+Math.pow(2, i-1) is greater than decimal, meaning
				//we do nothing and move to the next binary position
				bin[j]=0
			}
			i--
		}
		
		return bin
	}

	decimal2Hex(decimal){

	}
	hex2Decimal(hex){

	}
	

	string2Hex(string){
		return this.buffer2Hex(this.string2Buffer(string)).toUpperCase()
	}
	hex2String(hex){
		return this.buffer2String(this.hex2Buffer(hex.toUpperCase()))
	}
	string2Buffer(string){
		return Buffer.from(string, 'utf16le')
	}

	buffer2Hex(buffer){
		return  buffer.toString('hex').toUpperCase();
	}
	buffer2String(buffer) {
		return Buffer.from(buffer).toString('utf16le')
	}
	
	hex2Buffer(hex){
		return Buffer.from(hex.toUpperCase(), 'hex')
	}



	objectComparator(...keys){
		return (a, b) => {
			var item1 = a
			var item2 = b
			for(var i=0; i<keys.length; i++){
				item1 = item1[keys[i]]
				item2 = item2[keys[i]]
			}
			if (item1 < item2) {
			  return -1;
			}
			if (item1 > item2) {
			  return 1;
			}
			return 0;
		}
	}
}

export class Rand{
    constructor(){
        this.rand=this
    }
    str(n){return this.rand._str(this.rand.range(0, n))}
    int(n){return this.rand.range(0,n)}
    arr(n){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.thing())}; return arr}
    thing(){
        return[
            this.rand.intArr, this.rand.str, this.rand.int, this.rand.enc, this.rand.encArr, this.rand.strArr,
            this.rand.obj, this.rand.objArr
        ].sample()()
    }
    intArr(n=this.rand.int()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.int())}; return arr}

    strArr(n=this.rand.int()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.str())}; return arr}
    obj(n=this.rand.int()){if(n){return {[this.rand.str()]:this.rand.obj(n-1)}}else{return {}}};
    objArr(n=this.rand.int()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.obj())}; return arr}
    selection(bag){
        return bag[Math.floor(Math.random() * bag.length)];
    }
    range(min, max){
        return Math.floor(Math.random()*(max-min+1)+min)
    }
    _str(len, chars=this.latin().join('')){
        //programiz.com
        var str='';
        for (var i = 0; i<len; i++){str+=chars.charAt(Math.floor(Math.random()*chars.length))}
        return str;
    }
    mod10(){
        return Math.floor(Math.random()*(100-0+1)+0)%2
    }
	latin(){
		var latin =[] 
		for(var i = 32; i<=126; i++){
			latin.push(String.fromCharCode(i+''))
		}
		return latin
	}
	arabic(){
		var arabic =[] 
		for(var i = 1536; i<=1791; i++){
			arabic.push(String.fromCharCode(i+''))
		}
		return arabic
	
	}
	hex(n){
		return new Utils().bin2hex(this.bytes(n)).toUpperCase()
	}
	buffer(n){
		return new Utils().hex2Buffer(this.hex(n))
	}

	
	bytes(n){
		var bytes=''
		for(var i = 0; i<n; i++){
			for(var j = 0; j<8; j++){
				bytes+=this.mod10()
			}
		}
		return bytes
	}
	cjk(){
		var cjk =[] 
		for(var i = 19968; i<=20168; i++){
			'\u{1F603}'
			cjk.push(String.fromCharCode(i+''))
		}
		return cjk
	}
	algebra(){

	}
	calculus(){

	}
	physics(){

	}
}