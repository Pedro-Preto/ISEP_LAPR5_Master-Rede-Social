using System;
using System.Collections.Generic;
using System.Linq;
using DDDNetCore.Domain.Connections;

namespace DDDNetCore.Domain.ConnectionRequest
{
    public class UpdateConnectionRequestDto
    {
        public Guid Id { get; set; }

        public string StrengthUserTarget{ get; set; }
        
        public List<string> Tags;
        
        public string ConnectionState{ get; set; }

        public UpdateConnectionRequestDto( Guid id, string strengthUserTarget, string connectionState,List<string> tags)
        {
            Tags = tags;
            Id = id;
            StrengthUserTarget =strengthUserTarget;
            ConnectionState = connectionState;
        }
        private static List<ConnectionTags> ListConverted(IEnumerable<string> list)
        {
            return list.Select(b => new ConnectionTags(b)).ToList();
        }
        
    }
}