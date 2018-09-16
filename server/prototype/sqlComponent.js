import BaseComponent from "./baseComponent";

class sqlComponent extends BaseComponent {
    constructor() {
        super();

    }

    isJson (obj) {
        let isJson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
        return isJson;
    }
    /**
     * 
     * @param {*} columnNames select查询的条件，只查询一个字段的时候 就传字符串；如果是多个字段，使用数组包字符串 例：['', '']；若是多表查询 ['a.col1', 'b.col2']
     * @param {*} tables 查询的表名, 只有一个张表的时候，传字符串；如果是多张表，传输组包字符串 ex：['a', 'b'];
     * @param {json} singleColName json数据类型 传入的是一个json，where语句后面的自查询
     * @param {*} condition
     */
    selSQL(columnNames, tables, singleColName, condition) {
        console.log("columnNames:",columnNames);
        console.log("tables:",tables);
        console.log("singleColName:",singleColName);
        console.log(isJson(singleColName));
        if (!isJson(singleColName) && singleColName != null) {
            console.log('子查询的数据不是json格式，请重新输入');
            return;
        }
        let colStr = "";
        let sinStr = "";
        let tabStr = "";
        let selSQL = "";
        // 判断select条件
    
        if (Array.isArray(columnNames)) {
            for(let i = 0; i < columnNames.length; i++) {
                if (i != columnNames.length - 1) {
                    colStr += columnNames[i] + ",";
                } else {
                    colStr += columnNames[i];
                }
            }
            if (colStr.split('.').length - 1 != tables.length && colStr.indexOf('.') != -1) {
                console.log('传入的表名和查询的条件不匹配');
                return;
            }
        } else {
            console.log(colStr);
            colStr = columnNames;
        }
    
        // 判断table
        if (Array.isArray(tables)) {
            for(let i = 0; i < tables.length; i++) {
                if (tables.length > 1) {
                    if (i == tables.length - 1) {
                        tabStr += tables[i];
                    } else {
                        tabStr += tables[i] + ',';
                    }
                } else {
                    tabStr = tables[i];
                }
            }
        } else {
            tabStr = tables;
        }
        if (singleColName != null) {
            // 判断 where 条件
            for (const colName in singleColName) {
                // sinStr += colName + "=" + "'" +singleColName[colName] +"'"+ ",";
                sinStr += `${colName}='${singleColName[colName]}' ${condition} `;
            }
            
            selSQL = `select ${colStr} from ${tabStr} where ${sinStr}`;
        } else {
            selSQL = `select ${colStr} from ${tabStr}`;
        }
        console.log('class --- selSQL: ', selSQL);
        return selSQL;
    }
}