import java.util.Scanner;

public class add {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter the first number (num1): ");
        int num1 = scanner.nextInt();

        System.out.println("Enter the second number (num2): ");
        int num2 = scanner.nextInt();

        scanner.close();

        int result = num1 + num2;

        System.out.println(result);
    }
}
