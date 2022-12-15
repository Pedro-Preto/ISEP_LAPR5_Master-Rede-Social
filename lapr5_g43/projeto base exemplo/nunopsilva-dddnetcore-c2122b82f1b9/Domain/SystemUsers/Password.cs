using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.SystemUsers
{
    [ComplexType]
    public class Password:IValueObject
    {
        public string Psw;

        private Password()
        {}        
        
        public Password(string psw)
        {
            this.Update(psw);
        }

        public void Update(string t)
        {
          /*  1) It must contain at least a number

            2) one upper case letter

            3) 8 characters long.*/
              if (t != null && Regex.IsMatch(t,@"^(.{0,8}|[^0-9]*|[^A-Z])$"))
              {
                    this.Psw = t; 
              }
              else 
              { 
                  throw new BusinessRuleValidationException("Not a valid password!");
              }
        }

        public string Value()
        {
            return this.Psw;
        }

        public override string ToString()
        {
            return this.Psw;
        }
        
    }
}