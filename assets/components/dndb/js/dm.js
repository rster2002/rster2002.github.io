var path = userRef.collection("dm").doc("data");
var rootPath = path;
fileCount = 0;

userRef.collection("dm").doc("data").get().then((doc) => {
	if (doc && doc.exists) {
		console.log("Passing")
	} else {
		userRef.collection("dm").doc("data").set({
			createdOn: Date.now()
		});
	}
})


function addFolder() {
	var i = prompt("Folder name");
	if (i) {
		var ii = "f-" + genId();
		var folder = {
			name: i,
			createdOn: Date.now(),
			__id: ii
		};
		foldersObj[folderCount] = folder;
		path.collection("folders").doc(ii).set(folder).then(() => {
			$(".folders").append("<div class='added itemWrapper'><div class='added item center s1 rounded' onclick='openFolder(" + folderCount + ")'><div class='icon'><div class='circle center folder'><i class='center material-icons'>folder</i></div></div><div class='label'><h1>" + i + "</h1></div></div></div>")
		});
	}
}

async function getFolders() {
	var query = await createQuery(path.collection("folders").orderBy("createdOn", "desc"));
	return query;
}

async function getFiles() {
	var query = await createQuery(path.collection("files").orderBy("lastEdited", "desc"));
	return query;
}

async function showFolders() {
	var folders = await getFolders();
	folderCount = 0;
	if (folders[0] !== undefined) {
		for (var i = 0; i < folders.length; ++i) {
			var folder = folders[i];
			folderCount += 1;
			addFolderToList(folder, i);
		}
	}
}

async function showFiles() {
	var files = await getFiles();
	fileCount = 0;
	if (files[0] !== undefined) {
		for (var i = 0; i < files.length; ++i) {
			fileCount += 1;
			var file = files[i];
			addFileToList(file, i);
		}
	}
}

async function showPath() {
	$(".files .added").remove();
	$(".folders .added").remove();
	showFiles();
	showFolders();
}

foldersObj = {};
filesObj = {};

async function addFolderToList(folder, index) {
	foldersObj[index] = folder;
	$(".folders").append("<div class='added itemWrapper'><div id='folder" + index + "'class='added item center s1 rounded' onclick='openFolder(" + index + ")'><div class='icon'><div class='circle center folder'><i class='center material-icons'>folder</i></div></div><div class='label'><h1>" + folder.name + "</h1></div></div></div>");
}

async function addFileToList(file, index) {
	filesObj[index] = file;
	$(".files").append("<div class='added itemWrapper file " + file["__id"] + "'><div id='file" + index + "' class='added item center s1 rounded' onclick='openFile(" + index + ")'><div class='icon'><div class='circle center file'><i class='center material-icons'>insert_drive_file</i></div></div><div class='label'><h1>" + file.name + "</h1></div></div></div>");
}

function openEditor() {
	$(".fileBackground").show();
	$(".editFile").show();
	setTimeout(() => {
		$(".fileBackground").addClass("show");
		$(".editFile").addClass("show");
	}, 10);
}

function closeEditor() {
	$(".fileBackground").removeClass("show");
	$(".editFile").removeClass("show");
	setTimeout(() => {
		$(".fileBackground").hide();
		$(".editFile").hide();
	}, 100);

	if (del !== true) {
		var file = {
			name: $("#pTitle").val(),
			content: $("#content").val(),
			lastEdited: Date.now()
		}
		fileCount += 1;
		if (newFile) {
			var ii = "d-" + genId();
			file["__id"] = ii;
			filesObj[fileCount] = file;

			path.collection("files").doc(ii).set(file);
			$(".files").append("<div class='added itemWrapper file " + ii + "'><div id='file" + fileCount + "' class='added item center s1 rounded' onclick='openFile(" + fileCount + ")'><div class='icon'><div class='circle center file'><i class='center material-icons'>insert_drive_file</i></div></div><div class='label'><h1>" + file.name + "</h1></div></div></div>");
		} else {
			file["__id"] = fileId;
			filesObj[fileIndex] = file;

			path.collection("files").doc(fileId).set(file);
			$("#file" + fileIndex).children(".label").children("h1").text(file.name);
		}
	}
}

function addFile() {
	del = false;
	newFile = true;
	$(".contentArea").css("height", "90%");
	$(".buttons").hide();
	$("#pTitle").val("New file");
	$("#content").val("");
	openEditor();
}

function openFile(index) {
	del = false;
	newFile = false;
	var file = filesObj[index];
	fileIndex = index;
	fileId = file.__id;
	$(".contentArea").css("height", "80%");
	$(".buttons").show();
	$("#pTitle").val(file.name);
	$("#content").val(file.content);
	openEditor();
}

subFolderCount = 0;
subFolders = {
	0: rootPath
};
subFolderNames = {0: "Root"}

function openFolder(index) {
	subFolders[subFolderCount] = path;
	subFolderCount += 1;
	if (subFolderCount > 0) {
		$(".head .back").addClass("less");
		$(".head .option").addClass("less");
	}
	pathId = foldersObj[index]["__id"];
	var pathName = foldersObj[index]["name"];
	subFolderNames[subFolderCount] = pathName;
	$("#pathText").text(pathName);
	var newPath = path.collection("folders").doc(pathId);
	path = newPath;
	showPath();
}

function backFolder() {
	subFolderCount -= 1;
	if (subFolderCount === 0) {
		$(".head .back").removeClass("less");
		$(".head .option").removeClass("less");
	}
	$("#pathText").text(subFolderNames[subFolderCount]);
	var backPath = subFolders[subFolderCount];
	console.log(subFolderCount, backPath);
	path = backPath;
	showPath();
}

function deleteFolder() {
	if (confirm("Are you sure you want to delete this folder")) {
		path.delete().then(() => {
			backFolder();
		});
	}
}

function deleteFile() {
	del = true;
	$("." + fileId).remove();
	path.collection("files").doc(fileId).delete();
	closeEditor();
}

showPath();
