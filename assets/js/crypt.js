var encrypt = {
	"ATBASH": function(text) {
		var text = text.split("");
		var ret = [];
		for (var i = 0; i < text.length; i++) {
			switch (text[i]) {
				case 'a':
					var re = "z";
					break;
				case 'b':
					var re = "y";
					break;
				case 'c':
					var re = "x";
					break;
				case 'd':
					var re = "w";
					break;
				case 'e':
					var re = "v";
					break;
				case 'f':
					var re = "u";
					break;
				case 'g':
					var re = "t";
					break;
				case 'h':
					var re = "s";
					break;
				case 'i':
					var re = "r";
					break;
				case 'j':
					var re = "q";
					break;
				case 'k':
					var re = "p";
					break;
				case 'l':
					var re = "o";
					break;
				case 'm':
					var re = "n";
					break;
				case 'n':
					var re = "m";
					break;
				case 'o':
					var re = "l";
					break;
				case 'p':
					var re = "k";
					break;
				case 'q':
					var re = "j";
					break;
				case 'r':
					var re = "i";
					break;
				case 's':
					var re = "h";
					break;
				case 't':
					var re = "g";
					break;
				case 'u':
					var re = "f";
					break;
				case 'v':
					var re = "e";
					break;
				case 'w':
					var re = "d";
					break;
				case 'x':
					var re = "c";
					break;
				case 'y':
					var re = "b";
					break;
				case 'z':
					var re = "a";
					break;
				case ' ':
					var re = " ";
					break;
			}
			ret.push(re);
		}
		var ret = ret.join();
		while (ret.includes(",")) {
			var ret = ret.replace(",","");
		}
		return ret;
		},
	
	"A1Z26": function(text) {
		var text = text.split("");
		var ret = [];
		for (var i = 0; i < text.length; i++) {
			switch (text[i]) {
				case 'a':
					var re = "1";
					break;
				case 'b':
					var re = "2";
					break;
				case 'c':
					var re = "3";
					break;
				case 'd':
					var re = "4";
					break;
				case 'e':
					var re = "5";
					break;
				case 'f':
					var re = "6";
					break;
				case 'g':
					var re = "7";
					break;
				case 'h':
					var re = "8";
					break;
				case 'i':
					var re = "9";
					break;
				case 'j':
					var re = "10";
					break;
				case 'k':
					var re = "11";
					break;
				case 'l':
					var re = "12";
					break;
				case 'm':
					var re = "13";
					break;
				case 'n':
					var re = "14";
					break;
				case 'o':
					var re = "15";
					break;
				case 'p':
					var re = "16";
					break;
				case 'q':
					var re = "17";
					break;
				case 'r':
					var re = "18";
					break;
				case 's':
					var re = "19";
					break;
				case 't':
					var re = "20";
					break;
				case 'u':
					var re = "21";
					break;
				case 'v':
					var re = "22";
					break;
				case 'w':
					var re = "23";
					break;
				case 'x':
					var re = "24";
					break;
				case 'y':
					var re = "25";
					break;
				case 'z':
					var re = "26";
					break;
				case ' ':
					var re = " ";
					break;
			}
			ret.push(re);
		}
		var ret = ret.join();
		while (ret.includes(",")) {
			var ret = ret.replace(",","-");
		}
		return ret;
		}
}

var decrypt = {
	"A1Z26": function(text) {
		var text = text.split("-");
		var ret = [];
		for (var i = 0; i < text.length; i++) {
			switch (text[i]) {
				case '1':
					var re = "a";
					break;
				case '2':
					var re = "b";
					break;
				case '3':
					var re = "c";
					break;
				case '4':
					var re = "d";
					break;
				case '5':
					var re = "e";
					break;
				case '6':
					var re = "f";
					break;
				case '7':
					var re = "g";
					break;
				case '8':
					var re = "h";
					break;
				case '9':
					var re = "i";
					break;
				case '10':
					var re = "j";
					break;
				case '11':
					var re = "k";
					break;
				case '12':
					var re = "l";
					break;
				case '13':
					var re = "m";
					break;
				case '14':
					var re = "n";
					break;
				case '15':
					var re = "o";
					break;
				case '16':
					var re = "p";
					break;
				case '17':
					var re = "q";
					break;
				case '18':
					var re = "r";
					break;
				case '19':
					var re = "s";
					break;
				case '20':
					var re = "t";
					break;
				case '21':
					var re = "u";
					break;
				case '22':
					var re = "v";
					break;
				case '23':
					var re = "w";
					break;
				case '24':
					var re = "x";
					break;
				case '25':
					var re = "y";
					break;
				case '26':
					var re = "z";
					break;
				case ' ':
					var re = " ";
					break;
			}
			ret.push(re);
		}
		var ret = ret.join();
		while (ret.includes(",")) {
			var ret = ret.replace(",","");
		}
		return ret;
		}
}