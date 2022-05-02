namespace API.Helpers
{
    public class Pagination<T> where T : class
    {
        public Pagination(int pageIndex, int pageSize, int count, IReadOnlyList<T> data)
        {
            PageSize = (pageSize < 1 ? 1 : pageSize > 20 ? 20 : pageSize);
            TotalItems = count;
            TotalPAges = (int)Math.Ceiling((decimal)TotalItems / (decimal)pageSize);
            PageIndex = (pageIndex < 1 ? 1 : pageIndex > TotalPAges ? TotalPAges : pageIndex);
            var skip = (PageIndex - 1) * PageSize;
            Data = data.Skip(skip).Take(PageSize).ToList();
        }

        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }
        public int TotalPAges { get; set; }

        public IReadOnlyList<T> Data { get; set; }

    
    }

     
}
