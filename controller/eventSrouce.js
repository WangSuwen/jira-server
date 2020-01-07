exports.sendMsg = function (req, res) {
    let i = 0;
    // 根据 EventSource 规范设置报头
    res.writeHead(200, {
        "Content-Type": "text/event-stream", // 规定把报头设置为 text/event-stream
        "Cache-Control": "no-cache" // 设置不对页面进行缓存
    })
    // 用write返回事件流，事件流仅仅是一个简单的文本数据流，每条消息以一个空行(\n)作为分割。
    // res.write(':注释' + '\n\n')  // 注释行
    res.write('data:' + '消息内容1' + '\n\n') // 未命名事件

    res.write(  // 命名事件
        'event: myEve' + '\n' +
        'data:' + '消息内容2' + '\n' +
        /* 'retry:' + '2000' + '\n' + */
        'id:' + '12345' + '\n\n'
    );
    const interval = setInterval(function () {
        i++;
        res.write(
            'data:' + 'interval--消息内容' + i + '\n' +
            'id:' + i + '\n\n' // TODO: 这里必须加ID
        );
    }, 3000);
    req.connection.addListener("close", function () {
        console.log('关闭了链接');
        clearInterval(interval);
    }, false);
};
