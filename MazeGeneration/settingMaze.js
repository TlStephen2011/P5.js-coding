function Maze(){

    this.generateEdges = function(){

        for(var i = 1; i < n*n; i++){

            if(i%n !== 0){
                edgeArray.push([i,i+1]);
            }

            if(i <= n*(n-1)){
                edgeArray.push([i,i+n]);
            }

        }

    }

    this.displayEdges = function(){

        for(var i = 0; i < edgeArray.length; i++){

            var a = edgeArray[i][0];
            var b = edgeArray[i][1];
            var x = map(a%n, 0, n, 0, n*w);
            var y = map(floor(a/n)+1, 0, n, 0, n*w);

            if(b - a === 1){

                //draw vertical line
                line(x, y-w, x, y);

            } else if (b - a === n){

                //draw horizontal line
                if(a%n !== 0){
                    line(x-w, y, x, y);
                } else {
                    x = w*(n-1);
                    y = map(a/n, 0, n, 0, n*w);
                    line(x, y, n*w, y);
                }
            }    
        }

    }

    this.generateSets = function(){

        for(var i = 1; i <= n*n; i++){

            arrayOfSets.push([i]);

        }
    }

    this.generateBorder = function(){

        //an array of size 4*n will be created
        for(var i = 1; i <= n*n; i++){

            //first push every corner in twice 
            //then push every side in once
            if(i === 1){
                borderSet.push([i,i]);
                borderSet.push([i,i]);      
            } else if(i === n){
                borderSet.push([i,i]);
                borderSet.push([i,i]);     
            } else if(i === n*n){
                borderSet.push([i,i]);
                borderSet.push([i,i]);
            } else if(i === n*n - n + 1){
                borderSet.push([i,i]);
                borderSet.push([i,i]); 
            } else if(i < n){               
                borderSet.push([i,i]); 
            } else if(i%n === 0){               
                borderSet.push([i,i]);  
            } else if(i%n === 1){
                borderSet.push([i,i]);
            } else if(i > n*(n-1)){
                borderSet.push([i,i]);
            }

        }    

    }

    this.displayBorder = function(){

        for(var i = 0; i < borderSet.length; i++){

            var a = borderSet[i][0];
            var x = map(a%n, 0, n, 0, n*w);
            var y = map(floor(a/n)+1, 0, n, 0, n*w);
            var isCorner = false;

            if(i + 1 < borderSet.length && a === borderSet[i+1][0]){
                if(a === 1 || a === n || a === n*n || a === n*(n-1) + 1){
                    isCorner = true;
                }
            }
            
            if(!isCorner && a < n){
                //draw top line
                line(x-w, 0, x, 0);
            } else if(!isCorner && a > n*(n-1)){
                //draw bottom line
                line(x-w, y, x, y);
            } else if(!isCorner && a%n === 1){
                //draw left line
                line(0, y-w, 0, y);
            } else if(!isCorner && a%n === 0){
                //draw right line
                line(n*w, y-2*w, n*w, y-w);
            } else if(isCorner && a === 1){
                line(x-w, 0, x, 0);
                line(0, y-w, 0, y);
            } else if(isCorner && a === n){
                line(n*w-w, 0, n*w, 0);
                line(n*w, y-2*w, n*w, y-w);      
            } else if(isCorner && a === n*n){
                line(n*w, y-2*w, n*w, y-w);
                line(n*w-w, y-w, n*w, y-w);
            } else if(isCorner && a === n*(n-1) + 1){
                line(0, y-w, 0, y);
                line(x-w, y, x, y);
            }

        }



    }

    this.startAndEnd = function(a = floor(random(0, borderSet.length)), b = floor(random(0, borderSet.length))){

        var startIndex = a;
        var endIndex = b;

        start = borderSet[startIndex][0];
        end = borderSet[endIndex][0];

        borderSet.splice(startIndex, 1);
        borderSet.splice(endIndex, 1);


    }

    this.theBrains = function(){

        var someEdge = floor(random(0, chooseFrom.length));
        var a, b;

        if(chooseFrom.length > 0){

            a = chooseFrom[someEdge][0];
            b = chooseFrom[someEdge][1];

        }

        var posOfA, posOfB;
        var isIn = false;
        //isIn tells me if the subset of arrayOfSets contains both a && b.

        for(var i = arrayOfSets.length - 1; i >= 0; i--){
            // arrayOfSets[i] = sort(arrayOfSets[i]);
            for(var j = 0; j < arrayOfSets[i].length; j++){
                for(var k = 0; k < arrayOfSets[i].length; k++){  
                    var x = arrayOfSets[i][j];
                    var y = arrayOfSets[i][k];
                    if(a === x && b === y && k !== j){
                        isIn = true;
                    }
                }
            }
        }

        if(!isIn){

            for(var i = edgeArray.length - 1; i >= 0; i--){

                var x = edgeArray[i][0];
                var y = edgeArray[i][1];   

                if(a === x && b === y){
                    edgeArray.splice(i,1);
                }
            }


            for(var i = 0; i < arrayOfSets.length; i++){
                for(var j = 0; j < arrayOfSets[i].length; j++){

                    if(arrayOfSets[i][j] === b){
                        posOfB = i;
                    }

                    if(arrayOfSets[i][j] === a){
                        posOfA = i;
                    }
                }
            }


            for(var i = 0; i < arrayOfSets[posOfB].length; i++){
                arrayOfSets[posOfA].push(arrayOfSets[posOfB][i]);    
            }

            arrayOfSets.splice(posOfB,1);


        }

        chooseFrom.splice(someEdge,1);

    }
}