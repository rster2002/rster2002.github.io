<template>
    <div class="wrapper">
        <div class="col1">
            <div class="card">
                <h1 v-html="selected.name"></h1>
                <div class="iconList" v-if="selected.show">
                    <icon-text v-if="selected.type === 'PushEvent'" icon="push">
						<div class="card" v-for="commit in selected.commits">
							<h3>{{ commit.title }}</h3>
							<span class="markdown" v-html="commit.body"></span>
						</div>
					</icon-text>
					<icon-text v-if="selected.description !== ''" icon="description">
						<span class="markdown" v-html="selected.description"></span>
					</icon-text>
                </div>
            </div>
        </div>
        <div class="col1">
            <div class="card" id="gr">
                <h1>Events</h1>
                <div class="listItem" v-for="event in events" @click="select(event)">
                    <img :src="event.img" />
                    <p v-html="event.title"></p>
                </div>
                <div @click="loadMore()" class="listItem" v-if="batch === 30">
                    <p class="center">Load more</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">

</style>
