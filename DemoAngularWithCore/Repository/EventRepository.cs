using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DemoAngularWithCore.Model;

namespace DemoAngularWithCore.Repository
{
  public class EventRepository
  {
    MongoClient client = null;
    IMongoDatabase db = null;
    string conStr = "mongodb://localhost:27017";
    string dbName = "local";
    public EventRepository()
    {
      client = new MongoClient(conStr);
      db = client.GetDatabase(dbName);
    }
    public List<Event> GetAllEvents()
    {
      var evCol = db.GetCollection<Event>("DemoEvents");
      return evCol.AsQueryable<Event>().ToList();
    }
    public Event GetEventsById(int id)
    {
      var evCol = db.GetCollection<Event>("DemoEvents");
      return evCol.AsQueryable<Event>().Where(e => e.id == id).FirstOrDefault();
    }
    public IEnumerable<Session> GetSessionsByName(string searchTerm)
    {
      List<Session> result = new List<Session>();
      var evCol = db.GetCollection<Event>("DemoEvents");
      evCol.AsQueryable<Event>().ForEachAsync(async (evt) =>
      {
        var found = evt.sessions.AsEnumerable().Where(s => s.name.ToUpper().Contains(searchTerm.ToUpper())).ToList();
        result.AddRange(found);
      });//.RunSynchronously();

      return result;

      //  =>(
      //e => e.sessions.AsEnumerable().Where(s=>s.name.Contains(searchTerm))
      //).FirstOrDefault();
    }
  }
}
