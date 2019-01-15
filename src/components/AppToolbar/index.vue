<template>
    <div class="sys-toolbar" :class="align">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'AppToolbar',
    props: {
        align: {
            type: String,
            default: function(){
                return 'left'
            }
        }
    }
}
</script>