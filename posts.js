var posts = [{
    "_id"         : "570bb8140d24ea200688e913",
    "title"       : "MongoDB相关操作",
    "content"     : "<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MongoDB 是一个基于分布式文件存储的数据库。由 C++ 语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。</p><h3>&nbsp;&nbsp;&nbsp;插入文档</h3><p>&nbsp;&nbsp;&nbsp;&nbsp;MongoDB 使用 insert() 或 save() 方法向集合中插入文档，语法如下：</p><pre>db.col.insert({title: 'MongoDB 教程', <br>&nbsp;&nbsp;&nbsp; description: 'MongoDB 是一个 Nosql 数据库',<br>&nbsp;&nbsp;&nbsp; by: '菜鸟教程',<br>&nbsp;&nbsp;&nbsp; url: 'http://www.runoob.com',<br>&nbsp;&nbsp;&nbsp; tags: ['mongodb', 'database', 'NoSQL'],<br>&nbsp;&nbsp;&nbsp; likes: 100<br>})</pre><p>&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"\\&quot;color:\" rgb(51,=\"\" 51,=\"\" 51);=\"\" font-family:=\"\" 'microsoft=\"\" yahei',=\"\" 'helvetica=\"\" neue',=\"\" helvetica,=\"\" arial,=\"\" sans-serif;=\"\" font-size:=\"\" 12px;=\"\" font-style:=\"\" normal;=\"\" font-variant:=\"\" font-weight:=\"\" letter-spacing:=\"\" line-height:=\"\" 24px;=\"\" orphans:=\"\" auto;=\"\" text-align:=\"\" start;=\"\" text-indent:=\"\" 0px;=\"\" text-transform:=\"\" none;=\"\" white-space:=\"\" widows:=\"\" 1;=\"\" word-spacing:=\"\" -webkit-text-stroke-width:=\"\" display:=\"\" inline=\"\" !important;=\"\" float:=\"\" background-color:=\"\" rgb(255,=\"\" 255,=\"\" 255);\\\"=\"\">插入文档你也可以使用 db.col.save(document) 命令。如果不指定 _id 字段 save() 方法类似于 insert() 方法。如果指定 _id 字段，则会更新该 _id 的数据。</span></p><h3>更新文档</h3><p>&nbsp;&nbsp;&nbsp;&nbsp;MongoDB 使用 update() 和 save() 方法来更新集合中的文档。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;update() 方法用于更新已存在的文档。</p><pre>db.collection.update(<br>&nbsp;&nbsp; &lt;query&gt;,<br>&nbsp;&nbsp; &lt;update&gt;,<br>&nbsp;&nbsp; {<br>&nbsp;&nbsp;&nbsp;&nbsp; upsert: &lt;boolean&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp; multi: &lt;boolean&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp; writeConcern: &lt;document&gt;<br>&nbsp;&nbsp; }<br>)</pre><pre>参数说明：<br>query : update的查询条件，类似sql update查询内where后面的。<br>update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的<br>upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。<br>multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。<br>writeConcern :可选，抛出异常的级别。</pre><pre>只更新第一条记录：<br>db.col.update( { \\\"count\\\" : { $gt : 1 } } , { $set : { \\\"test2\\\" : \\\"OK\\\"} } );<br>全部更新：<br>db.col.update( { \\\"count\\\" : { $gt : 3 } } , { $set : { \\\"test2\\\" : \\\"OK\\\"} },false,true );<br>只添加第一条：<br>db.col.update( { \\\"count\\\" : { $gt : 4 } } , { $set : { \\\"test5\\\" : \\\"OK\\\"} },true,false );<br>全部添加加进去:<br>db.col.update( { \\\"count\\\" : { $gt : 5 } } , { $set : { \\\"test5\\\" : \\\"OK\\\"} },true,true );<br>全部更新：<br>db.col.update( { \\\"count\\\" : { $gt : 15 } } , { $inc : { \\\"count\\\" : 1} },false,true );<br>只更新第一条记录：<br>db.col.update( { \\\"count\\\" : { $gt : 10 } } , { $inc : { \\\"count\\\" : 1} },false,false );</pre><p>&nbsp;&nbsp;&nbsp;&nbsp;save() 方法通过传入的文档来替换已有文档。</p><h3>&nbsp;&nbsp;&nbsp;&nbsp;删除文档</h3><p>&nbsp;&nbsp;&nbsp;&nbsp;MongoDB remove()函数是用来移除集合中的数据。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;在执行remove()函数前先执行find()命令来判断执行的条件是否正确，这是一个比较好的习惯。</p><pre>db.collection.remove(<br>&nbsp;&nbsp; &lt;query&gt;,<br>&nbsp;&nbsp; {<br>&nbsp;&nbsp;&nbsp;&nbsp; justOne: &lt;boolean&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp; writeConcern: &lt;document&gt;<br>&nbsp;&nbsp; }<br>)</pre><pre>参数说明：<br>query :（可选）删除的文档的条件。<br>justOne : （可选）如果设为 true 或 1，则只删除一个文档。<br>writeConcern :（可选）抛出异常的级别。</pre><h3>&nbsp;&nbsp;&nbsp;&nbsp;查询文档</h3><p>&nbsp;&nbsp;&nbsp; db.col.find() 方法以非结构化的方式来显示所有文档。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;如果你需要以易读的方式来读取数据，可以使用 pretty() 方法，语法格式如下：db.col.find().pretty()。</p>\\n<p>&nbsp;&nbsp;&nbsp;&nbsp;<b>MongoDB 与 RDBMS Where 语句比较</b></p><p>&nbsp;&nbsp;&nbsp; 如果你熟悉常规的 SQL 数据，通过下表可以更好的理解 MongoDB 的条件语句查询：</p>\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n<table class=\"\\&quot;reference\" table=\"\" table-border\\\"=\"\" height=\"\\&quot;130\\&quot;\" width=\"\\&quot;1300\\&quot;\"><thead><tr><th>操作</th><th>格式</th><th>范例</th><th>RDBMS中的类似语句</th></tr></thead><tbody><tr><td>等于</td><td><code>{&lt;key&gt;:&lt;value&gt;</code>}</td><td><code>db.col.find({\\\"by\\\":\\\"菜鸟教程\\\"}).pretty()</code></td><td><code>where by = '菜鸟教程'</code></td></tr><tr><td>小于</td><td><code>{&lt;key&gt;:{$lt:&lt;value&gt;}}</code></td><td><code>db.col.find({\\\"likes\\\":{$lt:50}}).pretty()</code></td><td><code>where likes &lt; 50</code></td></tr><tr><td>小于或等于</td><td><code>{&lt;key&gt;:{$lte:&lt;value&gt;}}</code></td><td><code>db.col.find({\\\"likes\\\":{$lte:50}}).pretty()</code></td><td><code>where likes &lt;= 50</code></td></tr><tr><td>大于</td><td><code>{&lt;key&gt;:{$gt:&lt;value&gt;}}</code></td><td><code>db.col.find({\\\"likes\\\":{$gt:50}}).pretty()</code></td><td><code>where likes &gt; 50</code></td></tr><tr><td>大于或等于</td><td><code>{&lt;key&gt;:{$gte:&lt;value&gt;}}</code></td><td><code>db.col.find({\\\"likes\\\":{$gte:50}}).pretty()</code></td><td><code>where likes &gt;= 50</code></td></tr><tr><td>不等于</td><td><code>{&lt;key&gt;:{$ne:&lt;value&gt;}}</code></td><td><code>db.col.find({\\\"likes\\\":{$ne:50}}).pretty()</code></td><td><code>where likes != 50</code></td></tr></tbody></table>\\n<p>&nbsp;&nbsp;&nbsp;&nbsp;<b>MongoDB AND 条件</b></p><p>&nbsp;&nbsp;&nbsp;&nbsp;MongoDB 的 find() 方法可以传入多个键(key)，每个键(key)以逗号隔开，及常规 SQL 的 AND 条件。</p><pre>&nbsp;db.col.find({key1:value1, key2:value2}).pretty()</pre><p>&nbsp;&nbsp;&nbsp;&nbsp;<b>MongoDB OR 条件</b></p><p>&nbsp;&nbsp;&nbsp;&nbsp;MongoDB OR 条件语句使用了关键字 $or,语法格式如下：</p><pre>db.col.find({$or:[{\\\"by\\\":\\\"菜鸟教程\\\"},{\\\"title\\\": \\\"MongoDB 教程\\\"}]}).pretty()</pre><p>&nbsp;&nbsp;&nbsp;&nbsp;<b>AND 和 OR 联合使用</b><br></p><pre>db.col.find({\\\"likes\\\": {$gt:50}, $or: [{\\\"by\\\": \\\"菜鸟教程\\\"},{\\\"title\\\": \\\"MongoDB 教程\\\"}]}).pretty()</pre><p><b>&nbsp;&nbsp;&nbsp;&nbsp;MongoDB Limit() 方法&nbsp;&nbsp;&nbsp; </b></p><p>&nbsp;&nbsp;&nbsp;&nbsp;如果你需要在MongoDB中读取指定数量的数据记录，可以使用MongoDB的Limit方法，limit()方法接受一个数字参数，该参数指定从MongoDB中读取的记录条数。</p><pre>db.col.find({},{\\\"title\\\":1,_id:0}).limit(2)</pre><p>&nbsp;&nbsp;&nbsp;&nbsp;<b>MongoDB Skip() 方法</b></p><p>&nbsp;&nbsp;&nbsp;&nbsp;我们除了可以使用limit()方法来读取指定数量的数据外，还可以使用skip()方法来跳过指定数量的数据，skip方法同样接受一个数字参数作为跳过的记录条数。</p><pre>db.col.find({},{\\\"title\\\":1,_id:0}).limit(1).skip(1)</pre><p>&nbsp;&nbsp;&nbsp;<b>&nbsp;MongoDB sort()方法</b></p><p>&nbsp;&nbsp;&nbsp;&nbsp;在MongoDB中使用使用sort()方法对数据进行排序，sort()方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而-1是用于降序排列。</p><pre>db.col.find({},{\\\"title\\\":1,_id:0}).sort({\\\"likes\\\":-1})</pre><p><b>&nbsp;&nbsp;&nbsp;&nbsp;MongoDB 聚合</b></p><p>&nbsp;&nbsp;&nbsp;&nbsp;MongoDB中聚合(aggregate)主要用于处理数据(诸如统计平均值,求和等)，并返回计算后的数据结果。有点类似sql语句中的 count(*)。</p><pre>db.mycol.aggregate([{$group : {_id : \\\"$by_user\\\", num_tutorial : {$sum : 1}}}])<br>以上实例类似sql语句： select by_user, count(*) from mycol group by by_user</pre>\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n<table class=\"\\&quot;reference\" table=\"\" table-border\\\"=\"\"><tbody><tr><th style=\"\\&quot;width:10%;\\&quot;\">表达式</th><th style=\"\\&quot;width:50%\\&quot;\">描述</th><th>实例</th></tr><tr><td>$sum</td><td>计算总和。</td><td>db.mycol.aggregate([{$group : {_id : \\\"$by_user\\\", num_tutorial : {$sum : \\\"$likes\\\"}}}])</td></tr><tr><td>$avg</td><td>计算平均值</td><td>db.mycol.aggregate([{$group : {_id : \\\"$by_user\\\", num_tutorial : {$avg : \\\"$likes\\\"}}}])</td></tr><tr><td>$min</td><td>获取集合中所有文档对应值得最小值。</td><td>db.mycol.aggregate([{$group : {_id : \\\"$by_user\\\", num_tutorial : {$min : \\\"$likes\\\"}}}])</td></tr><tr><td>$max</td><td>获取集合中所有文档对应值得最大值。</td><td>db.mycol.aggregate([{$group : {_id : \\\"$by_user\\\", num_tutorial : {$max : \\\"$likes\\\"}}}])</td></tr><tr><td>$push</td><td>在结果文档中插入值到一个数组中。</td><td>db.mycol.aggregate([{$group : {_id : \\\"$by_user\\\", url : {$push: \\\"$url\\\"}}}])</td></tr><tr><td>$addToSet</td><td>在结果文档中插入值到一个数组中，但不创建副本。</td><td>db.mycol.aggregate([{$group : {_id : \\\"$by_user\\\", url : {$addToSet : \\\"$url\\\"}}}])</td></tr><tr><td>$first</td><td>根据资源文档的排序获取第一个文档数据。</td><td>db.mycol.aggregate([{$group : {_id : \\\"$by_user\\\", first_url : {$first : \\\"$url\\\"}}}])</td></tr><tr><td>$last</td><td>根据资源文档的排序获取最后一个文档数据</td><td>db.mycol.aggregate([{$group : {_id : \\\"$by_user\\\", last_url : {$last : \\\"$url\\\"}}}])</td></tr></tbody></table>",
    "coverImg"    : "http://img02.tooopen.com/images/20140314/sy_56692371155.jpg",
    "author"      : {"_id": "570a7073e1eb2b38104f06a0", "name": "zeev"},
    "meta"        : {"updateAt": "2016-04-11T14:43:32.241Z", "createAt": "2016-04-11T14:43:32.241Z"},
    "pv"          : 2,
    "__v"         : 0,
    "review"      : 0,
    "published_at": "2016-05-10T02:56:54.893Z",
    "updated_at"  : "2016-05-10T02:56:54.893Z",
    "created_at"  : "2016-05-10T02:56:54.893Z",
    "status"      : "draft",
    "page"        : false,
    "featured"    : false
}, {
    "_id"         : "570bb8590d24ea200688e914",
    "title"       : "AngularJS 2.0 您准备好了吗？",
    "content"     : "<p>&nbsp;&nbsp;&nbsp;&nbsp;AngularJS已然成为Web应用开发世界里最受欢迎的开源JavaScript框架。自成立以来，见证其成功的是惊人的经济增长以及团体的支持与采用——包括个人开发者、企业、社区。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;Angular1.x显然非常成功，为什么要剧烈地转向Angular2？<br></p><p>&nbsp;&nbsp;&nbsp;&nbsp;<b>性能</b></p><p>&nbsp;&nbsp;&nbsp; 随着时间的推移，各种特性被加入进去以适应不同场景下的应用开发。然而由于最初的架构限制（比如绑定和模板机制），性能的提升已经非常困难了。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;<b>快速变化的WEB</b></p><p>&nbsp;&nbsp;&nbsp;&nbsp;在语言方面，ECMAScript6的标准已经完成，这意味着浏览器将很快支持例如模块、类、lambda表达式、 generator等新的特性，而这些特性将显著地改变JavaScript的开发体验。<br>在开发模式方面，Web组件也将很快实现。然而现有的框架，包括Angular1.x对WEB组件的支持都不够好。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;<b>移动化</b></p><p>&nbsp;&nbsp;&nbsp;&nbsp;Angular1.x没有针对移动 应用特别优化，并且缺少一些关键的特性，比如：缓存预编译的视图、触控支持等。</p><p><br></p><h3>&nbsp; <b>有哪些争议？</b></h3><p>&nbsp;&nbsp;&nbsp;&nbsp;跳转到2.0版本将会打破原有的1.X版本应用，不会有任何的向后兼容性。<font color=\"\\&quot;#FF0000\\&quot;\"><span style=\"\\&quot;background-color:\" inherit;\\\"=\"\">这不是坑爹吗？</span></font></p><p><font color=\"\\&quot;#FF0000\\&quot;\"><span style=\"\\&quot;background-color:\" inherit;\\\"=\"\"><br></span></font></p><h3>&nbsp; <b>有哪些改变？</b></h3><ol><li>AtScript<p>&nbsp;&nbsp;&nbsp;&nbsp;AtScript是ES6的一个父集，被用于开发Angular 2.0。它是由Traceur编译器（连同ES6）处理来生成ES5代码并用TypeScript类型语法来生成执行时间的断言，以此来代替编译时的检查。不过AtScript并不是强制的，你仍然能够使用纯JavaScript/ES5代码代替AtScript来编写Angular应用。</p><br></li><li>改善依赖入驻（DI）<p>&nbsp;&nbsp;&nbsp;&nbsp;依赖注入（Dependency injection ）模式的基本思想是客户类Client不用自己来初始化它所依赖的成员变量IServer，使用一个独立的对象创建IServer适当的实现类并将它赋值给Client的成员变量。它对模块开发与组件隔离特别有益。Angular 2.0将会解决Angular 1.X所存在的这个方面的问题。添加丢失的的特性，如child injectors和lifetime/scope控制。</p></li><li>Annotations<p>&nbsp;&nbsp;&nbsp;&nbsp;AtScript提供工具关联元数据和功能。这有助于构建提供必要信息到DI库的对象实例（检查相关元数据时调用一个函数或创建一个类的实例）。它还容易通过提供一个注解重载参数数据。</p></li><li>Child Injectors<p>&nbsp;&nbsp;&nbsp;&nbsp;一个child injector继承了其父类的所有性能服务。根据要求，不同类型的对象可以被调用，并且自动覆盖不同的范围。</p></li><li>实例范围<p>&nbsp;&nbsp;&nbsp;&nbsp;改进的DI库将以实例范围为特性，这在使用Child Injectors和自己的范围标识符时变得更加强大。</p></li><li>模板和数据绑定<p>&nbsp;&nbsp;&nbsp;&nbsp;在开发应用中，模板和数据绑定将齐头并进。</p></li><li>动态载入<p>&nbsp;&nbsp;&nbsp;&nbsp;这是当前Angular版本所缺失的一个特性，不过将在Angular 2.0中出现。这将让开发者可以在忙碌中添加新的指令或控制器。</p></li><li>模板<p>&nbsp;&nbsp;&nbsp;&nbsp;在Angular 2.0中，模板编译过程将是异步的。由于代码是基于ES6模块规格，该模块加载器将通过简单的引用组件定义来加载依赖关系。</p></li><li>指令<p>在Angular 2.0中将会出现三种指令：</p><ol><li>组件指令——这些将通过JavaScript、HTML或一个可选的CSS样式表的封装逻辑创建可重复使用的组件。</li><li>装饰指令——这些指令将被用来装饰元素（例如添加一个工具提示，或使用ng-show/ng-hide来显示/隐藏元素）。</li><li>模板指令——这些将把HTML改变为可重复使用的模板。模板的实例化以及嵌入到DOM可以完全由指令控制。这样的例子包括ng-if和ng-repeat。</li></ol></li></ol><h2>&nbsp;Scope</h2><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$scope将从Angular 2.0中移除，取而代之的是ES6类。</p><p>&nbsp;&nbsp;&nbsp; 原文： http://www.csdn.net/article/2015-03-03/2824087<br></p>",
    "coverImg"    : "http://img02.tooopen.com/images/20140314/sy_56692371155.jpg",
    "author"      : {"_id": "570a7073e1eb2b38104f06a0", "name": "zeev"},
    "meta"        : {"updateAt": "2016-04-11T14:44:41.632Z", "createAt": "2016-04-11T14:44:41.632Z"},
    "pv"          : 1,
    "__v"         : 0,
    "review"      : 0,
    "published_at": "2016-05-10T02:56:54.893Z",
    "updated_at"  : "2016-05-10T02:56:54.893Z",
    "created_at"  : "2016-05-10T02:56:54.893Z",
    "status"      : "draft",
    "page"        : false,
    "featured"    : false
}, {
    "_id"         : "570bb88a0d24ea200688e915",
    "title"       : "什么鬼，又不知道怎么命名class了",
    "content"     : "<p>&nbsp;&nbsp;&nbsp;&nbsp;Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;Node.js 的包管理器 npm，是全球最大的开源库生态系统。</p><h1>&nbsp;Node.js 是如何工作的？</h1><p>&nbsp;&nbsp;&nbsp;&nbsp;Node.js 的主要思路是：使用非阻塞的，事件驱动的 I/O 操作来保持在处理跨平台 (across distributed devices) 数据密集型实时应用时的轻巧高效。这听起来有点绕口。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;它的真正含义是，Node.js 不是一个即将主导Web开发的世界的银弹级的平台。相反，它是一个满足特别需求的平台。你肯定不会希望使用 Node.js 去做 CPU密集型操作。事实上，使用它进行繁重的计算等于摒弃 Node 几乎所有的优点。Node 真正的亮点在于建设高性能，高扩展性的互联网应用——因为它能够处理庞大的并且高吞吐量的并发连接。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;它的工作原理是相当有趣的。传统的网络服务技术，是每个新增一个连接（请求）便生成一个新的线程，这个新的线程会占用系统内存，最终会占掉所有的可用内存。而 Node.js 仅仅只运行在一个单线程中，使用非阻塞的异步 I/O 调用，所有连接都由该线程处理，在 libuv 的加分下，可以允许其支持数万并发连接（全部挂在该线程的事件循环中）。</p><p class=\\\"text-center\\\">&nbsp;&nbsp;&nbsp;&nbsp;<img src=\\\"http://jbcdn2.b0.upaiyun.com/2013/12/toptal-blog-1_B.png\\\" style=\\\"width: 624px; float: none;\\\"></p><p>&nbsp;&nbsp;&nbsp;&nbsp;做一个简单的计算: 假设是普通的Web程序，新接入一个连接会占用 2M 的内存，在有 8GB RAM的系统上运行时, 算上线程之间上下文切换的成本，并发连接的最大理论值则为 4000 个。这是在传统 Web服务端技术下的处理情况。而 Node.js 则达到了约 1M 一个并发连接的拓展级别 (<a target=\\\"_blank\\\" href=\\\"http://blog.caustik.com/2012/08/19/node-js-w1m-concurrent-connections/\\\">相关证明</a>).</p><p>&nbsp;&nbsp;&nbsp;&nbsp;当然，在所有客户端的请求共享单一线程时也会有问题, 这也是一个编写 Node.js 应用的潜在缺陷. 首先, 大量的计算可能会使得 Node 的单线程暂时失去反应, 并导致所有的其他客户端的请求一直阻塞, 直到计算结束才恢复正常。 其次，开发人员需要非常小心，不要让一个 Exception 阻塞核心的事件循环，因为这将导致 Node.js 实例的终止（实际上就是程序崩溃）。（ 笔者注：如 PHP 中某个页面挂掉是不会影响网站运行的，但是 Nodejs 是一个线程一个线程来处理所有的链接，所以不论是计算卡了或者是被异常阻塞了都可能会影响到其他所有的链接。解决方案在稍后讨论。）</p><p>&nbsp;&nbsp;&nbsp;&nbsp;用来避免异常抛出时中断进程的方法是将异常使用回调传递出去（而不是抛出他们，就像在其他环境中一样）。即使一些未处理的异常阻塞了程序，依旧有多种应对的解决方案，而且也有很多可用于监视 Node 进程来执行必要的崩溃后恢复工作的策略和工具（虽然你将无法恢复用户的 Session ），最常见的是使用 Forever 模块，或者采用其他的外部系统工具如 upstart and monit。</p><h1>&nbsp;NPM: The Node Package Manager</h1><p>&nbsp;&nbsp;&nbsp;&nbsp;当我们讨论 Node.js 的时候，一个绝对不应该忽略地方就是默认内置的模块管理工具 —— NPM。 其灵感来源与 Ruby Gems（具有版本和依赖管理功能，可以通过在线资料库便捷安装可重用的组件的管理工具）。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;一个完整的公用模块列表可以在 NPM 的网站上找到（https:://npmjs.org/），或者通过使用与 Node.js 一同安装的 NPM CLI 工具放问到。该模块的生态系统向所有人开放，任何人都可以发布自己的模块，所有的模块都可以在 NPM 资料库中找到。你可以在 http://howtonode.org/introduction-to-npm 页面找到 NPM 的一个简要介绍（有点旧，但依旧能看）。</p><h1>&nbsp;Node.js 不应该在什么地方使用</h1><p>&nbsp;&nbsp;&nbsp;&nbsp;使用关系型数据库的服务端 WEB 应用</p><p>&nbsp;&nbsp;&nbsp; 原文：http://blog.jobbole.com/53736/<br></p>\",\"coverImg\":\"http://www.html5china.com/uploads/allimg/111218/161PC4H-1.png\",\"title\":\"为什么我要用 Node.js\",\"views\":0,\"meta\":{\"updateAt\":\"2016-02-26T10:25:13.590Z\",\"createAt\":\"2016-02-26T10:25:13.590Z\"},\"pv\":3},{\"__v\":0,\"_id\":\"56d0280867a95d66399cc47e\",\"author\":{\"name\":\"zeev\",\"_id\":\"56d026a1f79d074d06979e7e\"},\"content\":\"<p>&nbsp;&nbsp;&nbsp;&nbsp;到了这个时候，css经过这么多年的发展，页面的复杂性已经翻了好几倍了，那些无规划的混沌根本不够用，满眼的class看起来长得都差不多，后面全是1，2，3都不知道标到多少了，却不知道到底是啥区别；而原子类已经不适合频繁的修改调整更新，每更新下都是前后齐心协力。于是按职能划分的class命名规则就出现了。这里我们站在前人的肩膀上，试着去开辟一条道路，可以兼顾简洁可读性及可理解辨别性。当然class的简洁肯定离不开关键词的应用，这里我们先来过一遍常见的class关键词。<br></p><h2>常见class关键词：</h2><p>布局类：header, footer, container, main, content, aside, page, section<br>包裹类：wrap, inner<br>区块类：region, block, box<br>结构类：hd, bd, ft, top, bottom, left, right, middle, col, row, grid, span<br>列表类：list, item, field?<br>主次类：primary, secondary, sub, minor?<br>大小类：s, m, l, xl, large, small<br>状态类：active, current, checked, hover, fail, success, warn, error, on, off<br>导航类：nav, prev, next, breadcrumb, forward, back, indicator, paging, first, last<br>交互类：tips, alert, modal, pop, panel, tabs, accordion, slide, scroll, overlay,<br>星级类：rate, star<br>分割类：group, seperate, divider<br>等分类：full, half, third, quarter<br>表格类：table, tr, td, cell, row<br>图片类：img, thumbnail, original, album, gallery<br>语言类：cn, en<br>论坛类：forum, bbs, topic, post<br>方向类：up, down, left, right<br>其他语义类：btn, close, ok, cancel, switch; link, title, info, intro, more, icon; form, label, search, contact, phone, date, email, user; view, loading…</p><p><br></p><h2>制定简单规则：</h2><p>以中划线连接，如.item-img<br>使用两个中划线表示特殊化，如.item-img.item-img--small表示在.item-img的基础上特殊化<br>状态类直接使用单词，参考上面的关键词，如.active, .checked<br>图标以icon-为前缀（字体图标采用.icon-font.i-name方式命名）。<br>模块采用关键词命名，如.slide, .modal, .tips, .tabs，特殊化采用上面两个中划线表示，如.imgslide--full, .modal--pay, .tips--up, .tabs--simple<br>js操作的类统一加上js-前缀?<br>不要超过四个class组合使用，如.a.b.c.d<br>关键词及规则都有了，现在可以进入实战操作。<br></p>",
    "coverImg"    : "http://img02.tooopen.com/images/20140314/sy_56692371155.jpg",
    "author"      : {"_id": "570a7073e1eb2b38104f06a0", "name": "zeev"},
    "meta"        : {"updateAt": "2016-04-11T14:45:30.310Z", "createAt": "2016-04-11T14:45:30.310Z"},
    "pv"          : 1,
    "__v"         : 0,
    "review"      : 0,
    "published_at": "2016-05-10T02:56:54.893Z",
    "updated_at"  : "2016-05-10T02:56:54.893Z",
    "created_at"  : "2016-05-10T02:56:54.893Z",
    "status"      : "draft",
    "page"        : false,
    "featured"    : false
}, {
    "_id"         : "570bb8a30d24ea200688e916",
    "title"       : "优化Angular应用的性能",
    "content"     : "<p>MVVM框架的性能，其实就取决于几个因素：</p><ol><li>监控的个数</li><li>数据变更检测与绑定的方式</li><li>索引的性能</li><li>数据的大小</li><li>数据的结构</li></ol><h3>1. 减少监控值的个数</h3><p>&nbsp;&nbsp;&nbsp;&nbsp;监控值的个数怎么减少呢？</p><p>&nbsp;&nbsp;&nbsp;&nbsp;考虑极端情况，在不引入Angular的时候，监控的个数是为0的，每当我们有需要绑定的数据项，就产生了监控值。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;我们注意到，Angular里面使用了一种HTML模板语法来做绑定，开发业务项目非常方便，但考虑一下，这种所谓的“模板”，其实与我们常见的那种模板是不同的。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;传统的模板，是静态模板，将数据代入模板之后生成界面，之后数据再有变化，界面也不会变。但Angular的这种“模板”是动态的，当界面生成完毕，数据产生变更的时候，界面还是会更新。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;这是Angular的优势，但我们有时候也会因为使用不当，反而增加困扰。因为Angular采用了变动检测的方式来跟踪数据的变化，这些事情都是有负担的，很多时候，有些数据在初始化之后就不再会变化，但因为我们没有把它们区分出来，Angular还是要生成一个监听器来跟踪这部分数据的变化，性能也就受到牵累。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;在这种情况下，可以采用单次绑定，仅在初始化的时候把这些数据绑定，语法如下：</p><pre>&lt;div&gt;{{<span style=\\\"background-color: inherit;\\\"><font color=\\\"#FF0000\\\">::</font></span>item}}&lt;/div&gt;</pre><pre> &lt;/ul&gt;<br>&nbsp; &lt;li ng-repeat=\\\"item in <font color=\\\"#FF0000\\\">::</font>items\\\"&gt;{{item}}&lt;/li&gt;<br> &lt;ul&gt; &nbsp;<br></pre><p>&nbsp;&nbsp;&nbsp; 更新中！！！！！<br></p>",
    "coverImg"    : "http://img02.tooopen.com/images/20140314/sy_56692371155.jpg",
    "author"      : {"_id": "570a7073e1eb2b38104f06a0", "name": "zeev"},
    "meta"        : {"updateAt": "2016-04-11T14:45:55.683Z", "createAt": "2016-04-11T14:45:55.683Z"},
    "pv"          : 1,
    "__v"         : 0,
    "review"      : 0,
    "published_at": "2016-05-10T02:56:54.893Z",
    "updated_at"  : "2016-05-10T02:56:54.893Z",
    "created_at"  : "2016-05-10T02:56:54.893Z",
    "status"      : "draft",
    "page"        : false,
    "featured"    : false
}]