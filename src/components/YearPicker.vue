<template>
  <div class="input-group date" style="width:100px;">
    <input type="text" class="form-control" v-model="year" />
    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
  </div>
</template>
<script>
export default {
  name: 'year-picker',
  props: {
    year: String
  },
  mounted: function() {
    var that = this;
    $(this.$el).datepicker({
      'autoclose':true,
      'minViewMode':2,
      'maxViewMode':2,
      'format':'yyyy'
    }).on('changeDate', function(e){
      that.$emit('change',String(e.date.getFullYear()));
    });
  },
  updated: function(){
    $(this.$el).datepicker('update', this.year);
  }
}
</script>
