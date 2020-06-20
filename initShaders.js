//
//  initShaders.js
//

function initShaders( gl, vertexShaderId, fragmentShaderId )
{
    var vertShdr;
    var fragShdr;

    /* vertex shader */
    var vertElem = document.getElementById( vertexShaderId );
    if ( !vertElem ) { 
        alert( "Unable to load vertex shader " + vertexShaderId );
        return -1;
    }
    else {
        vertShdr = gl.createShader( gl.VERTEX_SHADER ); // vertex shader 생성
        gl.shaderSource( vertShdr, vertElem.text ); // 파라미터 : ( shader객체, [ 1 ], 실제 소스코드 , [NULL] )
        gl.compileShader( vertShdr );   // 컴파일이 성공적으로 완료되었는지 확인 가능 
        if ( !gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS) ) {    // 에러 메시지 출력
            var msg = "Vertex shader failed to compile.  The error log is:"
        	+ "<pre>" + gl.getShaderInfoLog( vertShdr ) + "</pre>";
            alert( msg );
            return -1;
        }
    }

    /* fragment shader */
    var fragElem = document.getElementById( fragmentShaderId );
    if ( !fragElem ) { 
        alert( "Unable to load vertex shader " + fragmentShaderId );
        return -1;
    }
    else {
        fragShdr = gl.createShader( gl.FRAGMENT_SHADER );   // fragment shader 생성
        gl.shaderSource( fragShdr, fragElem.text );
        gl.compileShader( fragShdr );
        if ( !gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS) ) {
            var msg = "Fragment shader failed to compile.  The error log is:"
        	+ "<pre>" + gl.getShaderInfoLog( fragShdr ) + "</pre>";
            alert( msg );
            return -1;
        }
    }

    /* shader program 객체 : 여러 shader를 결합한 마지막 연결된 버전 */
    var program = gl.createProgram();   //  program 생성 + 생성된 program 객체의 ID 반환
    
    // 이전에 컴파일 했던 shader들을 program 객체에 첨부
    gl.attachShader( program, vertShdr );   
    gl.attachShader( program, fragShdr );
    
    // 첨부한 shader들을 연결시킴
    gl.linkProgram( program );
    
    if ( !gl.getProgramParameter(program, gl.LINK_STATUS) ) {   // 에러 메시지 출력
        var msg = "Shader program failed to link.  The error log is:"
            + "<pre>" + gl.getProgramInfoLog( program ) + "</pre>";
        alert( msg );
        return -1;
    }

    return program;
}
