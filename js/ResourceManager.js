(function(){
    //资源管理类
    window.ResourceManager=Class.extend({
        //初始化
        init:function(){},
        //读取图片资源。两个参数，一个是图片JSON列表的URL地址，一个是回调函数
        //回调函数中，提供三个参数alreadyNumber,length,imageResourceObj
        loadImage:function(URL,callback){
            //存放图片资源的对象
            var imageResourceObj=new Object();
            //已经加载完毕的图片的数量
            var alreadyNumber=0;
            //用ajax请求，请求JSON文件
            var xhr=new XMLHttpRequest();
            //就绪状态的改变
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4&&xhr.status!=404){
                    //读取图片数组
                    var imageArray=JSON.parse(xhr.responseText).image;
                    //图片数量
                    var length=imageArray.length;
                    //遍历每个图片，添加onload事件监听
                    for(var i=0;i<length;i++){
                        var image=new Image();
                        //编号
                        image.index=i;
                        //一旦设置sec，那么http请求将发出
                        image.src=imagesArray[i].src;
                        //把名字写在每张图片自己身上 
                        image.name=imageArray[i].name;
                        //加载完毕事件监听
                        image.onload=function(){
                            //已经加载完毕的图片数量加1
                            alreadyNumber++;
                            //放入对象中
                            imageResourceObj[this.name]=this;
                            //调用回调函数
                            callback(alreadyNumber,length,imageResourceObj);
                        }
                    }
                }
            }
            //发出http请求
            xhr.open("get",URL,true);
            xhr.send(null);
        },
    });
})();