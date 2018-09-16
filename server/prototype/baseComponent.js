import fetch from 'node-fetch';

/**
 *  实现了上传和编码图片和视频
 *  支持GB级上传数据处理
 *  支持多种客户端数据提交
 */
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import { resolve } from 'dns';
import { rejects } from 'assert';

export default class BaseComponent {
    constructor() {
        this.idList = ['pd_id', 'p_id', 't_id', 'kd_id'];

        // 图片使用的场景
        this.imgTypeList = ['president', 'kindergarten', 'teacher', 'professor'];
        this.uploadImg = this.uploadImg.bind(this);
    }

    /** 
	 * 1.fecth函数一定要使用Proise函数，是属于全局window的一个方法
	 */ 

     async fetch(url = '', data = {}, type = 'GET', resType = 'JSON') {
         type = type.toUpperCase();
         resType = resType.toUpperCase();

         if (type = 'GET') {
            //  数据拼接字符串
             let dataStr = '';
            // Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&';
            });

            if (dataStr !== '') {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                url = url + '?' + dataStr;
            }
         }

        let requestConfig = {
          method: type,
          headers: {
            // 浏览器端可以接受的媒体类型
            'Accept': 'application/json',
            // 具体请求中的媒体类型信息
            'Content-Type': 'application/json'
          }
        }

        if (type = 'POST') {
          // 在requestContent上，修改或冲顶body这个属性
          Object.defineProperty(requestConfig, 'body', {
            // 将data转换为一个JSON字符串
            value: JSON.stringify(data)
          });
        }
        let responseJson;
        try {
          // 异步请求这个数据，并且等待这个结果返回
          const response = await fetch(url, requestConfig);
          if (resType = 'TEXT') {
            responseJson = await response.text();
          } else {
            responseJson = await response.json();
          }
        } catch (err) {
          console.log('获取http数据失败', err);
          throw new Error(err);
        }

        return responseJson;
     }

     async uploadImg(req, res, next) {
       const type = req.params.type;

       try {
        //  getPath 得到的Promise函数是一个结果，resolve、reject、pedding三个状态的一个
        const image_path = await this.getPath(req, res);
        res.send({
          status: 1,
          image_path
        });
       } catch (err) {
         console.log('上传图片失败', err);
         res.send({
           status: 0,
           type: 'ERROR_UPLOAD_IMG',
           message: '上传图片失败'
         });
       }
     }

      /* async getPath(req, res) {
      //  这个return回去的promise函数
      return new Promise((resolve, reject) => {
        // 创建一个form表单
        const form = formidable.IncomingForm();
        // 设置上传文件时临时存放的位置
        form.uploadDir = './public/img';

        // 解析node.js中的req请求中包含的form表单提交的数据
        form.parse(req, async (err, fields, files) => {
          let img_id;
          try {
            // xi
          }
        });
      });
     } */

     
}
