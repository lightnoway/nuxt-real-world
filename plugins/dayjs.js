import vue from 'vue';
import dayjs from 'dayjs';

vue.filter('dayjs',function(input,format='MMMM DD, YYYY'){
  return dayjs(input).format(format);
})