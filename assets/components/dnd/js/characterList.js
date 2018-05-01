$(".list").append("<div class='item'><div class='inner shadow-5' onclick='add()'><img src='../assets/components/dnd/images/icons/ic_add_black_48dp.png'></div></div>");
var sUid = sessionStorage.getItem("::uid");

obj = {};
characters = "abcdefghijklmnopqrstuvwxyz0123456789";
emptyCharacterObj = {"1_1":false,"2_1":false,"3_1":false,"4_1":false,"5_1":false,"6_1":false,"7_1":false,"8_1":false,"9_1":false,"10_1":false,"11_1":false,"12_1":false,"13_1":false,"14_1":false,"15_1":false,"16_1":false,"17_1":false,"18_1":false,"19_1":false,"20_1":false,"21_1":false,"22_1":false,"23_1":false,"24_1":false,"25_1":false,"26_1":false,"27_1":false,"28_1":false,"29_1":false,"30_1":false,"31_1":"","32_1":"","33_1":"","34_1":"","35_1":"","36_1":"","37_1":"","38_1":"","39_1":"","40_1":"","41_1":"","42_1":"","43_1":"","44_1":"","45_1":"","46_1":"","47_1":"","48_1":"","49_1":"","50_1":"","51_1":"","52_1":"","53_1":"","54_1":"","55_1":"","56_1":"","57_1":"","58_1":"","59_1":"","60_1":"","61_1":"","62_1":"","63_1":"","64_1":"","65_1":"","66_1":"","67_1":"","68_1":"","69_1":"","70_1":"","71_1":"","72_1":"","73_1":"","74_1":"","75_1":"","76_1":"","77_1":"","78_1":"","79_1":"","80_1":"","81_1":"","82_1":"","83_1":"","84_1":"","85_1":"","86_1":"","87_1":"","88_1":"","89_1":"","90_1":"","91_1":"","92_1":"","93_1":"","94_1":"","95_1":"","96_1":"","97_1":"","98_1":"","99_1":"","100_1":"","101_1":"","102_1":"","103_1":"","104_1":"","105_1":"","106_1":"","1_2":"","2_2":"","3_2":"","4_2":"","5_2":"","6_2":"","7_2":"","8_2":"","13_2":"","14_2":"","15_2":"","16_2":"","1_3":false,"2_3":false,"3_3":false,"4_3":false,"5_3":false,"6_3":false,"7_3":false,"8_3":false,"9_3":false,"10_3":false,"11_3":false,"12_3":false,"13_3":false,"14_3":false,"15_3":false,"16_3":false,"17_3":false,"18_3":false,"19_3":false,"20_3":false,"21_3":false,"22_3":false,"23_3":false,"24_3":false,"25_3":false,"26_3":false,"27_3":false,"28_3":false,"29_3":false,"30_3":false,"31_3":false,"32_3":false,"33_3":false,"34_3":false,"35_3":false,"36_3":false,"37_3":false,"38_3":false,"39_3":false,"40_3":false,"41_3":false,"42_3":false,"43_3":false,"44_3":false,"45_3":false,"46_3":false,"47_3":false,"48_3":false,"49_3":false,"50_3":false,"51_3":false,"52_3":false,"53_3":false,"54_3":false,"55_3":false,"56_3":false,"57_3":false,"58_3":false,"59_3":false,"60_3":false,"61_3":false,"62_3":false,"63_3":false,"64_3":false,"65_3":false,"66_3":false,"67_3":false,"68_3":false,"69_3":false,"70_3":false,"71_3":false,"72_3":false,"73_3":false,"74_3":false,"75_3":false,"76_3":false,"77_3":false,"78_3":false,"79_3":false,"80_3":false,"81_3":false,"82_3":false,"83_3":false,"84_3":false,"85_3":false,"86_3":false,"87_3":false,"88_3":false,"89_3":false,"90_3":false,"91_3":false,"92_3":false,"93_3":"","94_3":"","95_3":"","96_3":"","97_3":"","98_3":"","99_3":"","100_3":"","101_3":"","102_3":"","103_3":"","104_3":"","105_3":"","106_3":"","107_3":"","108_3":"","109_3":"","110_3":"","111_3":"","112_3":"","113_3":"","114_3":"","115_3":"","116_3":"","117_3":"","118_3":"","119_3":"","120_3":"","121_3":"","122_3":"","123_3":"","124_3":"","125_3":"","126_3":"","127_3":"","128_3":"","129_3":"","130_3":"","131_3":"","132_3":"","133_3":"","134_3":"","135_3":"","136_3":"","137_3":"","138_3":"","139_3":"","140_3":"","141_3":"","142_3":"","143_3":"","144_3":"","145_3":"","146_3":"","147_3":"","148_3":"","149_3":"","150_3":"","151_3":"","152_3":"","153_3":"","154_3":"","155_3":"","156_3":"","157_3":"","158_3":"","159_3":"","160_3":"","161_3":"","162_3":"","163_3":"","164_3":"","165_3":"","166_3":"","167_3":"","168_3":"","169_3":"","170_3":"","171_3":"","172_3":"","173_3":"","174_3":"","175_3":"","176_3":"","177_3":"","178_3":"","179_3":"","180_3":"","181_3":"","182_3":"","183_3":"","184_3":"","185_3":"","186_3":"","187_3":"","188_3":"","189_3":"","190_3":"","191_3":"","192_3":"","193_3":"","194_3":"","195_3":"","196_3":"","197_3":"","198_3":"","199_3":"","200_3":"","201_3":"","202_3":"","203_3":"","204_3":"","205_3":"","206_3":"","207_3":"","208_3":"","209_3":"","210_3":"","211_3":"","212_3":"","213_3":"","214_3":"","allowEdit":"0"}

function addTolist(i, characterId) {
	dbUsers.child(sUid).child("characters").child(characterId).once("value", function(c) {
		dbUsers.child(sUid).child("characters").child(characterId + "-info").once("value", function(j) {
			var characterObj = c.val();
			var characterInfo = j.val();
			var characterName = characterObj["96_1"];
			if (j.hasChild("dupe")) {
				$(".list").append("<div class='item'><div class='inner shadow-5' onclick='loadCharacter(" + i + ")'><h1>" + characterName + "</h1><p>Dupe: " + characterInfo.dupe + "</p></div></div>");
			} else {
				$(".list").append("<div class='item'><div class='inner shadow-5' onclick='loadCharacter(" + i + ")'><h1>" + characterName + "</h1></div></div>");
			}

			obj[i] = characterId;
		});
	});
}

function loadCharacter(index) {
	var characterName = obj[index];
	sessionStorage.setItem("::openCharacter", characterName);
	openPage("characterEditor");
}

function add() {
	var characterId = "character-" + randomString(characters, 4) + "-" + randomString(characters, 4) + "-" + randomString(characters, 4) + "-" + randomString(characters, 4);
	dbUsers.child(sUid).once("value", function(e) {
		if (e.hasChild("characterList")) {
			dbUsers.child(sUid).child("characterList").once("value", function(e) {
				characterList = e.val();
			});
		} else {
			characterList = [];
		}
	}).then(function() {
		dbUsers.child(sUid).child("characters").child(characterId).set(emptyCharacterObj).then(function() {
			dbUsers.child(sUid).child("characters").child(characterId + "-info").set({
				allowEdit: "0"
			});
			characterList.unshift(characterId);
			dbUsers.child(sUid).child("characterList").set(characterList);
			sessionStorage.setItem("::openCharacter", characterId);
			openPage("characterEditor");
		});
	})
}

dbUsers.child(sUid).once("value", function(e) {
	progress.show();
	
	if (e.hasChild("characterList")) {
		dbUsers.child(sUid).child("characterList").once("value", function(e) {
			var characterList = e.val();
			for (var i = 0; i < characterList.length; ++i) {
				addTolist(i, characterList[i]);
			}
			
			progress.hide();
		});
	}
});