import './theme/default/laydate.css';
import laydate from './laydate';
class LaydateComponent{
    constructor($filter){
        this.$filter = $filter;
        this.require = '^ngModel';
        this.scope = {
            ngModel:'=',
            ngLaydate:'@',
            layConfig:'=',
            maxDate: '=',
            minDate: '='
        };
    }

    link(scope,elem,attrs){

        // 日期初始化参数
        let options = {
            elem: elem[0], // 指定元素
            format:'yyyy-MM-dd',
            type: 'datetime',
            btns: ['clear', 'confirm'],
            done:(newDate,formatDate) => {
                scope.ngModel = newDate;
                scope.$apply();
            }
        };

        this.extends(options,scope.layConfig||{});

        options.type = this.getLaydateType(options.format);

        let dateOpts = laydate.render(options);
        // 最小日期
        if(attrs.hasOwnProperty('minDate')){
            scope.$watch('minDate',(newDate,oldDate)=>{
                if(newDate && newDate!=oldDate){
                    newDate = new Date(newDate);
                    dateOpts.config.min = this.$filter('date')(newDate,'yyyy-MM-dd HH:mm:ss');;
                    dateOpts.handleLimitDate(dateOpts.config);
                }
            });
        }

        // 最大日期
        if(attrs.hasOwnProperty('maxDate')){
            scope.$watch('maxDate',(newDate,oldDate)=>{
                if(newDate && newDate!=oldDate){
                    newDate = new Date(newDate);
                    dateOpts.config.max = this.$filter('date')(newDate,'yyyy-MM-dd HH:mm:ss');
                    dateOpts.handleLimitDate(dateOpts.config);
                }
            });
        }
    }

    /**
     *
     * @param format
     * @returns {string}
     */
    getLaydateType(format){
        if(format){
            let type = 'date';
            let [hasYear, hasMonth, hasDay, hasHour, hasMin] = this.handleFormat(format,[
                    'yyyy','MM','dd','HH','mm'
                ]);
            if(hasYear && hasMonth && hasDay
                && hasHour && hasMin){
                type = 'datetime';
            }else if(hasHour && hasMin){
                type = 'time';
            }else if(hasYear && !hasMonth){
                type = 'year';
            }else if(hasYear && hasMonth && !hasDay){
                type = 'month';
            }
        }
        return type||'datetime';
    }

    /**
     * 处理日期格式
     * @param formats
     * @returns {Array}
     */
    handleFormat(formatStr,formats){
        let formatArr = [];
        if(Array.isArray(formats)){
            formats.forEach(format=>{
                formatArr.push(formatStr.includes(format));
            })
        }
        return formatArr;
    }

    /**
     * 集成合并(对象)
     * @param target
     * @param origal
     */
    extends(target,origal){
        for(var key in origal){
            if(origal[key] && key!='sure' && key!='done'){
                target[key] = origal[key];
            }else if(origal[key]){
                let applySure = target['done'];
                target['done'] = (newDate,formatDate)=>{
                    applySure(newDate,formatDate);
                    origal[key](newDate,formatDate);
                };
            }
        }
    }
}

export default angular.module('ng-laydate',[])
    .directive('ngLaydate',($filter)=>new LaydateComponent($filter));
