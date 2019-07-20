<template lang="html">
    <div class="textboxWrapper" :class="{ err: v.length > ml }">
        <div class="textbox" :class="{ f: focus, textarea: type === 'textarea', mb: ht !== '' }" @click="f()">
            <p class="label" :class="{ c: focus }"><span>{{ label }}</span></p>
            <input v-if="t !== 'textarea' && t !== 'select'" :type="t" @focus="f()" @blur="b()" :value="value" @input="i()" ref="n" />
            <textarea v-if="t === 'textarea'" @focus="f()" @blur="b()" :value="value" @input="i()" ref="n"></textarea>
            <select v-if="t === 'select'" :value="value" @input="i()" @focus="f()" @blur="b()" ref="n">
                <slot></slot>
            </select>
        </div>
        <p class="helpertext" v-if="ht.length > 0">{{ ht }}</p>
    </div>
</template>

<script>

export default {
	props: ["label", "val", "vname", "type", "maxlength", "helpertext", "value"],
	data() {
		return {
			v: "",
			n: "",
			focus: false,
            t: "text",
            ht: "",
            ml: 10000000,
            validateFn: function() {}
		}
	},
	watch: {
		val() {
			if (this.v !== this.val) {
                this.v = this.val;
			}
        },
        value() {
            this.$emit('change');
        }
	},
	methods: {
        i() {
            this.v = this.$refs.n.value;
            if (this.type === "number") {
                this.v = Number(this.v);
            }
            this.$emit("input", this.v);
        },
		f() {
			this.focus = true;
			this.$refs.n.focus();
		},
		b() {
			if (this.v === "") {
				this.focus = false;
			}
		}
	},
	created() {

        console.log(this.value);
		if (this.value !== undefined) {
			this.v = this.value;
			if (this.v !== "") {
				this.focus = true;
			}
        }
        
        console.log(this.validate);

		if (this.vname === undefined) {
			this.n = this.label
		} else {
			this.n = this.vname;
		}

		if (this.type !== undefined) {
			this.t = this.type;
        }
        
        if (this.helpertext !== undefined) {
            this.ht = this.helpertext;
        }

        if (this.maxlength !== undefined) {
            this.ml = Number(this.maxlength);
        }
	}
}
</script>

<style lang="stylus" scoped>
@import "../default.stylus";

size = 20px;

.textboxWrapper {

    &.lessMargin .textbox {
        margin: 20px;
        margin-left: auto;
        margin-right: auto;
    }

    .helpertext {
        padding: 0px 32px;
        font-size: 12px;
        margin-top: 4px;
        color: rgba(defaultFontColor, .8);
    }

    &.err {
        .textbox {
            border-color: #b00020;

            &.f {
                border-color: #b00020;
            }

            .label {
                color: #b00020;

                &.c {
                    color: #b00020;
                }
            }
        }

        .helpertext {
            color: #b00020;
        }
    }

    .textbox {
        position: relative;
        height: size + 12px;
        width: 90%;
        border: 2px solid textboxBorder;
        border-radius: interactiveRadius;

        margin: 32px;
        margin-left: auto;
        margin-right: auto;

        padding: 2px 0px;

        &.f {
            border: 2px solid secondaryColor;
        }

        &.mb {
            margin-bottom: 0px;
        }

        &.textarea {
            height: 212px;
            resize: none;

            p.label {
                top: 6px;
                transform: translateY(0);
            }
        }

        p.label {
            margin: 0;
            padding: 0px 0px;
            display: inline-block;

            position: absolute;
            z-index: 1;
            top: 50%;
            left: 8px;
            transform: translateY(-50%);

            font-family: defaultFont;
            font-size: size;

            transition: 100ms cubic-bezier(0.4, 0.0, 0.2, 1) all;
            cursor: text;

            &.c {
                top: -4%;
                font-size: 12px;
                color: secondaryColor;
                cursor: default;
            }

            span {
                display: inline-block;
                background-color: white;
                padding: 0px 4px;
                border-radius: 2px;
            }
        }

        input, select {
            position: absolute;
            border: 0;
            outline: 0;
            padding: 0px 8px;
            width: calc(99% - 16px);

            padding: 0px 0px;

            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            font-size: size;

            font-family: defaultFont;
        }

        textarea {
            position: absolute;
            border: 0;
            outline: 0;
            padding: 0px 8px;
            width: calc(99% - 16px);

            padding: 0px 0px;

            resize: none;

            top: 6px;
            left: 50%;
            transform: translateX(-50%);

            font-size: size;

            font-family: defaultFont;

            height: 200px;
        }
    }
}

</style>
