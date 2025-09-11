title: laravel API简易开发笔记
author: Believe firmly
tags:
  - 笔记
categories: []
date: 2019-06-16 20:39:00
---
###### API路由
laravel更目录下已经引入了路由文件 api.php 作为api的开发，我们可以吧接口需要的路由写入下方。
GET--获取数据
POST--创建数据
PUT--更新数据
DELETE--删除数据
<!--more-->
![](https://laravelacademy.org/wp-content/uploads/2018/03/15221669201582.jpg)

```

header('Access-Control-Allow-Origin:*'); //跨域访问

Route::get('/banner/{banner_id}', 'Api\GetController@banner');

Route::get('/page', 'Api\GetController@page');

Route::get('/cate/{cate_id}', 'Api\GetController@cate');

Route::get('/list/{art_id}', 'Api\GetController@list');

Route::get('/logo/{nav_id}', 'Api\GetController@logo');

Route::post('/book','Api\PostController@Book');

```

###### Controll公共
```
class ApiController extends BaseController
{
        //指定返回数据
    public function  response($data,$code=201)
    {
        return ['code'=>$code,'data'=>$data];
    }

    public function PostApi($code=201)
    {

            return [
                'code'=>$code,
                'data'=>'提交成功'
            ];


    }
}
```



###### Controll功能
get
```
class GetController extends   ApiController
{

//banner
    public function banner($banner_id)
    {
        if($banner_id){
        $data = Banner::where('Banner_id',$banner_id)->get();
        }else{
        $data = Banner::get();
        }

       return $this->response($data);
   }
    //亮点
    public function  page()
    {
        $page = Page::where('page_id',1)->get();
        return $this->response($page);
    }
    //设计师
    public function  cate($cate_id)
    {
        if($cate_id){
            $data = Cate::where('cata_id',$cate_id)->get();
        }else{
            $data = Cate::get();
        }
        return $this->response($data);
    }
//楼盘列表
    public function  list($list_id)
    {
        if($list_id){

          $data = DB::table('list')
              ->join('cate', 'list.cate_id', '=', 'cate.cate_id')
              ->where('art_id',$list_id)
              ->get();

//
        }else{
            $data = Word::get();
        }
        return $this->response($data);
    }
    //logo
    public function nav($logo_id)
    {
        if($logo_id){
            $data = Nav::where('nav_id',$logo_id)->get();
        }else{
            $data = Nav::get();
        }

        return $this->response($data);
    }





}

```

post
```
//前台提交信息
class PostController extends  ApiController
{
    public function Book(Bookrequest $bookrequest  )
    {
        $input = Input::except('_token', '_method');
        $input['book_time'] = time();
        $re = Book::create($input)->get();
        $re;
        return $this->PostApi();
    }
}

```


###### Requset校验层 
开启访问权限
```
   public function authorize()
    {
        //权限开启
        return true;
    }

```


用于入库的字段校验


```

   public function rules()
    {
        return [
            'book_name'=>'required|min:2',
            'book_call'=>'required|min:11|max:13|unique:book',
            'book_lp'=>'required|min:1',
            'book_m'=>'required|min:1',
            'book_view'=>'required|min:1'

        ];


    }
    
    
```


###### postman测试数据
![](https://raw.githubusercontent.com/newleidy/pictures/master/postman/003.png)

![](https://laravelacademy.org/wp-content/uploads/2018/03/15222058160996.jpg)