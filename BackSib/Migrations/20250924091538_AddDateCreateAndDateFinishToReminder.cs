using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackSib.Migrations
{
    /// <inheritdoc />
    public partial class AddDateCreateAndDateFinishToReminder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateFinish",
                table: "Reminders",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateFinish",
                table: "Reminders");
        }
    }
}
