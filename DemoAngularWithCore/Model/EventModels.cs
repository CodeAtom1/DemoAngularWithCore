using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoAngularWithCore.Model
{
  public class Event
  {
    [BsonId]
    [JsonIgnore]
    public ObjectId Id { get; set; }
    //[JsonIgnore]
    [BsonElement("id")]
    public int id { get; set; }
    public string name { get; set; }
    public string date { get; set; }
    public string time { get; set; }
    public double price { get; set; }
    public string imageUrl { get; set; }
    public Location location { get; set; }
    //[JsonIgnore]
    [BsonElement]
    public Session[] sessions { get; set; } = new Session[0];
    public string onlineUrl { get; set; }
  }

  public class Location
  {
    public string address { get; set; }
    public string city { get; set; }
    public string country { get; set; }
  }

  public class Session
  {
    public int eventId { get; set; }
    [JsonIgnore]
    public ObjectId Id { get; set; }
    [BsonElement]
    public int id { get; set; }
    public string name { get; set; }
    public string presenter { get; set; }
    public int duration { get; set; }
    public string level { get; set; }
    [BsonElement("abstract")]
    [JsonProperty(PropertyName = "abstract")]
    public string _abstract { get; set; }
    public string[] voters { get; set; }
  }
}
