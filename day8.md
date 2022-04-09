1.分页器的封装原理?
知道当前第几页>pageNo
知道分页器一共需要展示多少条数据>total
知道每一页需要展示数据个数>pageSize
知道连续的页码数> 5|7--对称,好看.
分页器需要考虑的情况:连续的页码数--暗含最少页码数,因此需要对特殊情况进行处理.
pageNo要位于连续页的中间,因此需要对pageNo特别靠前或者末尾的特殊情况进行处理,前者需要把start设置为1,end为continues;后者需要让end为totalPage,而让start为totalPage-continues+1