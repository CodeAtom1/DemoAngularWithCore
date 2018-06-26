using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver.Linq;
using MongoDB.Bson.Serialization.Attributes;
using DemoAngularWithCore.Repository;

namespace DemoAngularWithCore.Controllers
{
  [Route("/api/[Controller]")]
  public class ApiController : Controller
  {
    EventRepository repo;

    [HttpGet("/api/events")]
    public string Get()
    {
      repo = new EventRepository();
      var list = repo.GetAllEvents();
      return JsonConvert.SerializeObject(list);
    }
    [HttpGet("/api/events/{id}")]
    public string Get(int id)
    {
      repo = new EventRepository();
      var evt = repo.GetEventsById(id);
      return JsonConvert.SerializeObject(evt);
    }
    [HttpGet("/api/sessions/search")]
    public string Get(string searchvalue)
    {
      repo = new EventRepository();
      var evt = repo.GetSessionsByName(searchvalue);
      return JsonConvert.SerializeObject(evt);
    }
  }
}
