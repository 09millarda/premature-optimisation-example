using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using data;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [Route("api")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private static readonly Random random = new Random();

        [HttpGet("employees")]
        public IEnumerable<Employee> GetEmployees()
        {
            var employees = new List<Employee>
            {
                new Employee
                {
                    Forename = "Ruby-May",
                    Surname = "Hastings",
                    Job = "Senior Developer"
                },
                new Employee
                {
                    Forename = "Roza",
                    Surname = "Knights",
                    Job = "Caretaker"
                },
                new Employee
                {
                    Forename = "Humaira",
                    Surname = "Easton",
                    Job = "CEO"
                },
                new Employee
                {
                    Forename = "Imanu",
                    Surname = "Lu",
                    Job = "Project Manager"
                },
                new Employee
                {
                    Forename = "Tommy",
                    Surname = "Atkins",
                    Job = "Software Developer"
                },
                new Employee
                {
                    Forename = "Nicole",
                    Surname = "Shaffer",
                    Job = "Team Leader"
                },
                new Employee
                {
                    Forename = "Edgar",
                    Surname = "Proctor",
                    Job = "Software Developer"
                },
                new Employee
                {
                    Forename = "Eamonn",
                    Surname = "Flores",
                    Job = "Tester"
                },
                new Employee
                {
                    Forename = "Belinda",
                    Surname = "Foreman",
                    Job = "Office Manager"
                },
                new Employee
                {
                    Forename = "Alfred",
                    Surname = "Willis",
                    Job = "Tester"
                },
                new Employee
                {
                    Forename = "Lily-Anne",
                    Surname = "Wills",
                    Job = "Senior Developer"
                },
                new Employee
                {
                    Forename = "Yousif",
                    Surname = "Ryan",
                    Job = "Tester"
                },
                new Employee
                {
                    Forename = "Annie",
                    Surname = "Anthony",
                    Job = "Software Developer"
                },
                new Employee
                {
                    Forename = "Samara",
                    Surname = "Trujillo",
                    Job = "UX Designer"
                },
                new Employee
                {
                    Forename = "Loui",
                    Surname = "Gardner",
                    Job = "Project Owner"
                },
                new Employee
                {
                    Forename = "Amina",
                    Surname = "Cunningham",
                    Job = "Team Leader"
                },
                new Employee
                {
                    Forename = "Ibraheem",
                    Surname = "Alvarado",
                    Job = "Industry Researcher"
                },
                new Employee
                {
                    Forename = "Jim",
                    Surname = "Hays",
                    Job = "Finance Manager"
                },
                new Employee
                {
                    Forename = "Zidan",
                    Surname = "Craig",
                    Job = "Dev Ops"
                },
                new Employee
                {
                    Forename = "Bernard",
                    Surname = "Horner",
                    Job = "Dev Ops"
                }
            }.Select((e, i) => { e.Id = i; return e; }).OrderBy(e => e.Surname);

            return employees;
        }

        [HttpGet("hours/{employeeId}")]
        public async Task<EmployeeWeekSummary> GetHours(int employeeId)
        {
            var weeklySummary = new EmployeeWeekSummary
            {
                EmployeeId = employeeId
            };

            var currentDate = DateTimeOffset.UtcNow.Date;
            var startOfWeekDiff = (7 + (currentDate.DayOfWeek - DayOfWeek.Monday)) % 7 + 7;
            var startOfWeek = currentDate.AddDays(-1 * startOfWeekDiff).Date;

            var hours = new List<EmployeeHours>();
            for (int i = 0; i < 5; i++)
            {
                var date = startOfWeek.AddDays(i);

                hours.Add(new EmployeeHours
                {
                    Date = date,
                    Hours = random.Next(7, 10)
                });
            }

            weeklySummary.DailyHours = hours;
            weeklySummary.TotalHours = hours.Sum(h => h.Hours);

            await Task.Delay((int)Math.Round(random.NextDouble() * 4000));

            return weeklySummary;
        }

        [HttpGet("allHours/{employeeIds}")]
        public async Task<IEnumerable<EmployeeWeekSummary>> GetAllHours(string employeeIds)
        {
            var tasks = employeeIds.Split(',').Select(id => int.Parse(id)).Select(id => GetHours(id));

            var weeklySummaries = await Task.WhenAll(tasks).ConfigureAwait(false);

            return weeklySummaries;
        }
    }
}
