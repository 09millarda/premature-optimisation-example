using System;
using System.Collections.Generic;
using System.Text;

namespace data
{
    public class EmployeeWeekSummary
    {
        public int EmployeeId { get; set; }
        public IEnumerable<EmployeeHours> DailyHours { get; set; }
        public int TotalHours { get; set; }
    }
}
