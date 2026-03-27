namespace Aurora.Application.Common.Models;

public class ApiResponse<T>
{
    public bool Succeeded { get; set; }
    public string Message { get; set; } = string.Empty;
    public List<string> Errors { get; set; } = new List<string>();
    public T Data { get; set; }

    public ApiResponse() { }

    public ApiResponse(T data, string message = "")
    {
        Succeeded = true;
        Message = message;
        Data = data;
    }

    public static ApiResponse<T> Success(T data, string message = "")
    {
        return new ApiResponse<T>(data, message);
    }

    public static ApiResponse<T> Failure(List<string> errors, string message = "One or more errors occurred.")
    {
        return new ApiResponse<T>
        {
            Succeeded = false,
            Errors = errors,
            Message = message
        };
    }
}
