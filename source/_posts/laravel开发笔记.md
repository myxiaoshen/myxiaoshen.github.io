layout: larave实用扩展包
title: laravel笔记
tags:
  - laravel
  - 笔记
categories: []
date: 2017-08-09 12:06:00
---
###### 1.控制器增删改（文章分类设计的范围比较广就用他来示范，大致的方法）

增 
``` bash
public function store()
    {
   	 //获取用户输入并剔除数组中不需要的元素
        $Input =Input::except('_token','art_img');
 		 // 获取当前时间戳
        $Input['art_time'] = time();

        $re= Word::create($Input);
        if ($re){
            return redirect('list');
        } else{

            return "<script>alert('提交失败');history.go(-1);</script>";
        }

}
```

删  
``` bash
    public function show($cate_id)
    {
        $re = Cate::where('cate_id',$cate_id)->delete(); //删除那一条
        if ($re){
            Cate::where('cate_pid',$cate_id)->update(['cate_pid'=>0]);//更新删除剩下的子集分类调整为顶级
            return "<script>alert('删除分类成功');history.go(-1);</script>";
        }else{

            return "<script>alert('修改分类失败');history.go(-1);</script>";
        }
    }
```

改
``` bash
   public function update($cate_id)
    {

        $input = Input::except('_token', '_method', 'sort');//提出传输数据
        $re = Cate::where('cate_id', $cate_id)->update($input);//告诉更新那一条where条件，等于；
        if ($re) {
            return redirect('cate');
        } else {
            return "<script>alert('修改分类失败');history.go(-1);</script>";
        }
    }
```
<!-- more -->
###### 2.排序
先声明排序的post路由
  

前台

      <input type="text" onchange="changeOrder(this,{{$v->nav_id}})" value="{{$v->nav_order}}">
引入uploadify 异步提交数据到后台控制器
``` bash
    function changeOrder(obj,nav_id){	
        var nav_order = $(obj).val();
        $.post("{{url('admin/navs/changeorder')}}",{'_token':'{{csrf_token()}}','nav_id':nav_id,'nav_order':nav_order},function(data){
            if(data.status == 0){
                layer.msg(data.msg, {icon: 6});
            }else{
                layer.msg(data.msg, {icon: 5});
            }
        });
    }
```

```
 public function changeOrder()
    {
        $input = Input::all();
        $navs = Navs::find($input['nav_id']);
        $navs->nav_order = $input['nav_order'];
        $re = $navs->update();
        if($re){
            $data = [
                'status' => 0,
                'msg' => '自定义导航排序更新成功！',
            ];
        }else{
            $data = [
                'status' => 1,
                'msg' => '自定义导航排序更新失败，请稍后重试！',
            ];
        }
        return $data;
    }
```


###### 3.传输数据到前台
分页
``` bash
  	//用orderBy通过ID排倒叙，并用paginate向页面输入10条信息用 调用links方法显示分页信息
   $Word = Word::orderBy('art_id', 'desc')->paginate(1);
  	 //compact页面大范围使用 with部分 传入变量
    return view('admin.list',compact('Word'));
```

###### 4.前台模板

``` bash
@extends
@section
@foreach
			//if语句的用法{{--如果父级标题id等于当前子级标题id就默认选中--}}
@if($d->cate_id==$shuju->cate_pid) selected @endif 

{{！！  ！！}}可以将一些敏感元素排除
```
###### 5.表单提交一定要和资源路由提交方法一致

学会模拟表单提交 下面2介绍2种方法
``` bash
  <input type="hidden" name="_method" value="put">
  ————————————————————————————————————————————————
  {{method_field('PUT')}}
```

###### 6.后台的验证于返回到模板
后台的验证
``` bash
    $tiaojian = ['nav_name' =>'required','nav_url'=> 'required'];
    $fanhui   = ['nav_name.required' => '导航名称不能为空', 'nav_url'=>'导航地址不能为空'];    
     $Validator = Validator::make($input,$tiaojian,$fanhui);
```
返回错误
```
if($validator->passes()){
  returen '1';
}else{
  //返回错误信息到前台接受
  return back()->withErrors($validator);
}
```
模板
```
//如果传过来有错误就会输出信息
   @if(count($errors)>0
            
                //传过来的输出是数组形式所以要循环打印错误
                    @foreach($errors->all() as $error)
                      {{$error}}
                    @endforeach
             
                @endif
            </div>
        @endif
```

###### 7.确定是否执行的onclick方法
参靠uploadify官方文档
引入了外部插件uploadify
``` bash
   function delArt(art_id) {
        layer.confirm('您确定要删除这篇文章吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            $.post("{{url('admin/article/')}}/"+art_id,{'_method':'delete','_token':"{{csrf_token()}}"},function (data) {
                if(data.status==0){
                    location.href = location.href;
                    layer.msg(data.msg, {icon: 6});
                }else{
                    layer.msg(data.msg, {icon: 5});
                }
            });
        }, function(){

        });
    }
```
后台控制器   引入了外部插件样式
```
 public function destroy($art_id)
    {
        $re = Article::where('art_id',$art_id)->delete();
        if($re){
            $data = [
                'status' => 0,
                'msg' => '文章删除成功！',
            ];
        }else{
            $data = [
                'status' => 1,
                'msg' => '文章删除失败，请稍后重试！',
            ];
        }
        return $data;
    }
```
###### 8.子分类的管理
 建议卸载mode文件中，通过控制器调用tree方法
``` bash
        public function tree()
       {
           $cate = $this->all();
           return $this->getTree($cate, 'cate_name', 'cate_id', 'cate_pid');
       }


    public function getTree($data, $field_name, $field_id = 'id', $field_pid = 'pid', $pid = 0)
    {
        $arr = array();
        foreach ($data as $k => $v) {
            if ($v->$field_pid == $pid) {
                $data[$k]["_" . $field_name] = $data[$k][$field_name];
                $arr[] = $data[$k];
                foreach ($data as $m => $n) {
                    if ($n->$field_pid == $v->$field_id) {
                        $data[$m][$field_name] =  ''.'├─ '.$data[$m][$field_name];
                        $arr[] = $data[$m];
                    }
                }
            }
        }
        return $arr;

    }
```
控制器调用
```
 public function index()
    {
        $cate = (new Cate)->tree();
        return view('admin.cate')->with('fl', $cate);
    }
```
###### 9.前台用到的魔术方法
通过这个方法将每个页面需要用到的数据传输进去
``` bash
  public function __construct()
    {
   
        $navs = Navs::all();
        View::share('navs',$navs);
   
    }
```
##### 网站配置篇
<br>
常用的artisan命令
<a>http://blog.csdn.net/jiandanokok/article/details/72897682</a>