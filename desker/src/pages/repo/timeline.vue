<template lang="html">
    <div>
        <div class="card">
            <div class="userTimeline">
                <svg id="gantt"></svg>
            </div>
        </div>
    </div>
</template>

<script>

import Gantt from "frappe-gantt";

export default {
    created() {
        var tasks = [
            {
                id: 'Task 1',
                name: 'Redesign website',
                start: '2016-12-28',
                end: '2016-12-31',
                progress: 20
            }
        ]

        new Gantt("#gantt", tasks);
    }
};
</script>

<style lang="stylus" scoped>
rowsize = 24px;

.userTimeline {
	width: 100%;
	height: rowsize;

	.user {
		width: rowsize;
		height: rowsize;
		float: left;

		img {
			height: 70%;
			width: 70%;
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 50%;
			border: #131313 1px solid;
		}
	}

	.timeline {
		width: "calc(100% - %s)" % rowsize;
		height: 100%;
		float: left;
		background-color: #e5e5e5;

		.task {
			height: 70%;
			position: relative;
			top: 50%;
			transform: translateY(-50%);
			background-color: #000f47;
			border-radius: 100px;
		}
	}
}
</style>
